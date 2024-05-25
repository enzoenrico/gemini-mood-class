import pygame
import gemini

# Initialize Pygame
pygame.init()

# Set the width and height of the screen
screen_width = 800
screen_height = 600

# Set the frames per second
fps = 30

# Set the initial color code
color_code = (0, 0, 0)

# Create the screen
screen = pygame.display.set_mode((screen_width, screen_height))
# Create a clock object to control the frame rate
clock = pygame.time.Clock()

while True:
    # Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            pygame.quit()
            break

    # Update the color code based on user input
    userInput = input("[+] ->")
    aiOutput = gemini.genJson(userInput)
    emotions = aiOutput['emotions']
    userInput = aiOutput['color'].replace("#", "")
    bgColor = tuple(int(userInput[i:i+2], 16) for i in (0, 2, 4))

    # Update the background color
    screen.fill(bgColor)

    # Create a font object
    font = pygame.font.Font(None, 36)

    # Create a text surface
    opposite_color = (255 - bgColor[0], 255 - bgColor[1], 255 - bgColor[2])
    text_surface = font.render(userInput, True, opposite_color)
    emotions_text = font.render(str(emotions), True, opposite_color)

    # Get the text surface rectangle
    emotions_rect = emotions_text.get_rect()
    text_rect = text_surface.get_rect()

    # Set the position of the text in the middle of the screen
    text_rect.center = (screen_width // 2, screen_height // 2)
    emotions_rect.center = (screen_width // 2, screen_height // 2 + 50)

    # Draw the text surface on the screen
    screen.blit(text_surface, text_rect)

    # Update the screen
    pygame.display.flip()

    # # Control the frame rate
    clock.tick(fps)

