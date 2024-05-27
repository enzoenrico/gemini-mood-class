from modules import gemini

classifier = gemini.Classifier()

res = classifier.genJson("I'm not feeling happy today")
print(res)