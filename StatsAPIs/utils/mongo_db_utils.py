import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["ExamPortal"]

def is_db_connection():
    if myclient:
        print("Mongo Database Connection Successfully.....:)")

def execute_find_query(document, query):
    collection = mydb[document]
    filtered_doc = collection.find(query)
    docs = []
    for doc in filtered_doc:
        docs.append(doc)
    print(len(docs))
    return docs

if __name__ == "__main__":
    # below Engine code for testing
    # my_query = {"classroomId": "b7d7dc51-9ac5-40ee-bd19-ec71994687a5"}
    # execute_find_query("quizzes", my_query)
    is_db_connection()
