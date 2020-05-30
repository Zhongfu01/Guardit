import os
from flask import Flask, render_template, request, Blueprint, jsonify
from firebase_admin import credentials, firestore, initialize_app
from views.manage.user import user_api


app = Flask(__name__)
app.register_blueprint(user_api)

# Initialize Firestore DB
cred = credentials.Certificate('key.json')
default_app = initialize_app(cred)
db = firestore.client()

@app.route('/', methods=['GET'])
def index():
    return render_template('index.html')

@app.route('/sign_in', methods=['GET'])
def sign_in():
    """
    sign_in(): sign in according to request data. If fail, return error info
    """
    result = {"success": True}
    data = request.args;
    username = data['username']
    passwords = data['passwords']
    userRef = db.collection('users')

    users = userRef.where('username', '==', username).limit(1).get()
    users = list(users)

    if len(users) == 0:
        result['success'] = False
        return jsonify(result), 400
    else:
        user = users[0]
        userDict = user.to_dict()
        result.update(userDict)
        result.update({'userId': user.id})

        return jsonify(result), 200




@app.route('/sign_up', methods=['POST'])
def sign_up():
    """
    sign_up(): sign up new users according to request data.
    """
    result = {"success": True}
    data = request.get_json();
    firstName = data['firstName']
    lastName = data['lastName']
    username = data['username']
    passwords = data['passwords']

    userRef = db.collection('users')

    existUsers = userRef.where('username', '==', username).limit(1).get()
    users = list(existUsers)

    # username exists
    if len(users) > 0:
        result['success'] = False
        return jsonify(result), 400

    # username doesn't exist, then register
    userRef.document().set(
        {"firstName": firstName,
         "lastName": lastName,
         "username": username,
         "passwords": passwords
        }
    )

    query_user = userRef.where('username', '==', username).limit(1).get()
    users = list(query_user)
    user = users[0]
    userDict = user.to_dict()
    userDict.update({'user_id': user.id})
    result.update(userDict)
    return jsonify(result), 200

@app.route('/register_device', methods=['POST'])
def register_device():
    """
    register_device(): register new device according to request data.
    """
    result = {"success": True}
    data = request.get_json();

    if 'serialNumber' not in data or data['serialNumber'] == '':
        result['success'] = False
        return jsonify(result), 400

    serialNumber = data['serialNumber']
    userId = data['userId']
    # modelName = data['serialNumber']
    # sensitivity = data['sensitivity']
    deviceRef = db.collection('devices')


    devices = deviceRef.where('serialNumber', '==', serialNumber).limit(1).get()
    devices = list(devices)
    if len(devices) == 0:
        result['success'] = False
        return jsonify(result), 400

    device = devices[0]
    deviceDict = device.to_dict()

    if deviceDict['registered'] == False:
        deviceDict['registered'] = True
        deviceDict['userId'] = userId
        deviceRef.document(device.id).update(deviceDict)
        result.update(deviceDict)
        return jsonify(result), 200
    else:
        result['success'] = False
        return jsonify(result), 400

@app.route('/register_device', methods=['GET'])
def testTrigger():
    testRef = db.collection('testTrigger')
    tests = list(testRef.limit(1).get()) 

    test = tests[0]
    testDict = test.to_dict()

    testDict['triggered'] = True;
    testRef.document(test.id).update(testDict)

    return "thank you", 200


@app.route('/add', methods=['POST'])
def create():
    """
        create() : Add document to Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post'}
    """
    user_ref = db.collection('users')

    try:
        id = request.json['id']
        user_ref.document(id).set(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

@app.route('/list', methods=['GET'])
def read():
    """
        read() : Fetches documents from Firestore collection as JSON
        todo : Return document that matches query ID
        all_todos : Return all documents
    """
    try:
        # Check if ID was passed to URL query
        todo_id = request.args.get('id')
        if todo_id:
            todo = todo_ref.document(todo_id).get()
            return jsonify(todo.to_dict()), 200
        else:
            all_todos = [doc.to_dict() for doc in todo_ref.stream()]
            return jsonify(all_todos), 200
    except Exception as e:
        return f"An Error Occured: {e}"
@app.route('/update', methods=['POST', 'PUT'])
def update():
    """
        update() : Update document in Firestore collection with request body
        Ensure you pass a custom ID as part of json body in post request
        e.g. json={'id': '1', 'title': 'Write a blog post today'}
    """
    try:
        id = request.json['id']
        todo_ref.document(id).update(request.json)
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"
@app.route('/delete', methods=['GET', 'DELETE'])
def delete():
    """
        delete() : Delete a document from Firestore collection
    """
    try:
        # Check for ID in URL query
        todo_id = request.args.get('id')
        todo_ref.document(todo_id).delete()
        return jsonify({"success": True}), 200
    except Exception as e:
        return f"An Error Occured: {e}"

port = int(os.environ.get('PORT', 8080))
if __name__ == "__main__":
    app.run(threaded=True, host='0.0.0.0', port=port)
