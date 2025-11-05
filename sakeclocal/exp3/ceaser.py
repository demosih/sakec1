def caesar(s,shift):
    out=[]
    for ch in s:
        o=ord(ch)
        if 65<=o<=90: out.append(chr(o+shift))
        
    return (out)

print(caesar("HELLO",3))
print(caesar("HII",-3))
