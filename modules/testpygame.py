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

# Game loop
running = True
while running:
    # Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
            pygame.quit()
            break

    # Update the color code based on user input
    color_input = input("Enter a hex color code: ")
    try:
        aiOutput = gemini.genJson(color_input)
        emotions = aiOutput['emotions']
        color_input = aiOutput['color'].replace("#", "")
        bgColor = tuple(int(color_input[i:i+2], 16) for i in (0, 2, 4))
    except ValueError:
        print("Invalid hex color code. Please try again.")

    # Update the background color
    screen.fill(bgColor)

    # Create a font object
    font = pygame.font.Font(None, 36)

    # Create a text surface
    opposite_color = (255 - bgColor[0], 255 - bgColor[1], 255 - bgColor[2])
    text_surface = font.render(color_input, True, opposite_color)
    # Get the text surface rectangle
    text_rect = text_surface.get_rect()
    # Set the position of the text in the middle of the screen
    text_rect.center = (screen_width // 2, screen_height // 2)
    # Draw the text surface on the screen
    screen.blit(text_surface, text_rect)

    # Update the screen
    pygame.display.flip()

    # Control the frame rate
    clock.tick(fps)

