import pymongo

myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient["ExamPortal"]

def execute_find_query(document, query):
    collection = mydb[document]
    filtered_doc = collection.find(query)
    for x in filtered_doc:
        print(x)
    return filtered_doc

if __name__ == "__main__":
    # execute_find_query("attempt_question")
    pass