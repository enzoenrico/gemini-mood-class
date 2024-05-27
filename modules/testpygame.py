import pygame

# Initialize Pygame
pygame.init()

# Set the window size
window_size = (400, 300)

# Create the Pygame window
window = pygame.display.set_mode(window_size)

# Set the initial color
color = (255, 255, 255)  # White

# Run the game loop
running = True

hex_code = input("Enter a hex color code: ")
while running:
    # Fill the window with the current color
    window.fill(color)

    # Update the display
    pygame.display.flip()

    # Handle events
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False
        try:
            color = pygame.Color(hex_code)
        except ValueError:
            print("Invalid hex color code!")

# Quit Pygame
pygame.quit()
