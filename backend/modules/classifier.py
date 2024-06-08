import json
import google.generativeai as genai


class Classifier:
    def __init__(self) -> None:
        self.promptFile = "prompt.json"
        self.apiKey = "AIzaSyBv715_eeUwnxY1RAUwCCVT8GHyUIp1RPQ"
        genai.configure(api_key=self.apiKey)
        self.generation_config = {
            "temperature": 1,
            "top_p": 0.95,
            "top_k": 64,
            "max_output_tokens": 8192,
            "response_mime_type": "application/json",
        }
        self.safety_settings = [
            {"category": "HARM_CATEGORY_HARASSMENT", "threshold": "BLOCK_ONLY_HIGH"},
            {"category": "HARM_CATEGORY_HATE_SPEECH", "threshold": "BLOCK_ONLY_HIGH"},
            {
                "category": "HARM_CATEGORY_SEXUALLY_EXPLICIT",
                "threshold": "BLOCK_ONLY_HIGH",
            },
            {
                "category": "HARM_CATEGORY_DANGEROUS_CONTENT",
                "threshold": "BLOCK_ONLY_HIGH",
            },
        ]
        self.prompt_parts = [
            "You should get the input and return what seniment you think the user is feeling based on the input, you should also return a hex color code that represents the emotion that the input gives off.\nMake sure to give your output in a JSON format",
            "input: Hi! Today was a great day, can't wait to go home and be with my girlfriend",
            'output: {\n"emotions" : ["Happy", "Excited"],\n"color" :  "#FFFF00\n}',
            "input: I don't wanna talk, not really in the mood, piss off.",
            'output: {\n"emotions" : ["Angry", "Frustrated"],\n"color" :  "#0014DC"\n}',
            "input: i'm not really in the mood for going out... think i'll stay home alone again",
            'output: {\n"emotions" : ["Sad", "Lonely"],\n"color" :  "#595978"\n}',
            "input: i don't want you talking to him again, I''ve told you he's interested in you, why won't you listen to me?",
            'output: {\n"emotions": ["Jealous", "Angry", "Concerned"],\n"color": "#660066" \n}',
            "input: i got that new job!",
            'output: {\n"emotions" : ["Excited", "Happy"],\n"color" :  "#FFD700" \n}',
            "input: i've lost my job...",
            'output: {\n"emotions": ["Sad", "Stressed"], \n"color": "#616161"\n}',
        ]

        self.model = genai.GenerativeModel(
            model_name="gemini-1.5-pro-latest",
            generation_config=self.generation_config,
            safety_settings=self.safety_settings,
            system_instruction=self.prompt_parts,
        )

    # def updatePrompt(self, prompt: str) -> bool:
    #   self.prompt_parts.append(prompt)

    #   with open("prompts.json", "w") as file:
    #       json.dump(self.prompt_parts, file)

    #   with open("prompts.json", "r") as file:
    #       self.prompt_parts = file.read()
    #   print(self.prompt_parts)
    #   return True

    def genJson(self, userInput: str):
        response = self.model.generate_content(userInput)
        response_json = json.loads(response.text)
        # self.updatePrompt(f"input: {userInput},\noutput: {response_json},\n")
        self.prompt_parts.append(f"input: {userInput},\noutput: {response_json},\n")

        return response_json
