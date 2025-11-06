def caesar_cipher(text, shift, mode):
    result = ""
    for char in text:
        if char.isalpha():  # Encrypt or decrypt letters only
            shift_base = 65 if char.isupper() else 97
            if mode == 'encrypt':
                result += chr((ord(char) - shift_base + shift) % 26 + shift_base)
            elif mode == 'decrypt':
                result += chr((ord(char) - shift_base - shift) % 26 + shift_base)
        else:
            result += char 
    return result

print("=== Caesar Cipher Program ===")
choice = input("Do you want to Encrypt or Decrypt a message? (E/D): ").strip().lower()
message = input("Enter your message: ")
shift_value = int(input("Enter shift value (e.g. 3): "))

if choice == 'e':
    encrypted = caesar_cipher(message, shift_value, 'encrypt')
    print("\nEncrypted Message:", encrypted)
elif choice == 'd':
    decrypted = caesar_cipher(message, shift_value, 'decrypt')
    print("\nDecrypted Message:", decrypted)
else:
    print("\nInvalid choice! Please enter 'E' or 'D'.")