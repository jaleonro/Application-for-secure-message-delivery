def keysGenerator
  primeNumbers = [101, 103, 107, 109, 113, 127, 131, 137, 139, 149, 
                  151, 157, 163, 167, 173, 179, 181, 191, 193, 197, 
                  199, 211, 223, 227, 229, 233, 239, 241, 251, 257, 
                  263, 269, 271, 277, 281, 283, 293, 307, 311, 313, 
                  317, 331, 337, 347, 349, 353, 359, 367, 373, 379, 
                  383, 389, 397, 401, 409, 419, 421, 431, 433, 439, 
                  443, 449, 457, 461, 463, 467, 479, 487, 491, 499, 
                  503, 509, 521, 523, 541, 547, 557, 563, 569, 571, 
                  577, 587, 593, 599, 601, 607, 613, 617, 619, 631, 
                  641, 643, 647, 653, 659, 661, 673, 677, 683, 691, 
                  701, 709, 719, 727, 733, 739, 743, 751, 757, 761, 
                  769, 773, 787, 797, 809, 811, 821, 823, 827, 829, 
                  839, 853, 857, 859, 863, 877, 881, 883, 887, 907, 
                  911, 919, 929, 937, 941, 947, 953, 967, 971, 977]

  randomPosition = rand(0..(primeNumbers.length-1))
  p = primeNumbers[randomPosition] 

  if ((randomPosition - 6) > -1) then
    aux = primeNumbers[(randomPosition - 6)..(randomPosition -1)]    
    q = aux [rand(0..(aux.length-1))]
  else 
    aux = primeNumbers[(randomPosition + 1)..(randomPosition + 6)]    
    q = aux [rand(0..(aux.length-1))]
  end

  n = p * q
  puts ('p:')
  puts p 
  puts ('q:')
  puts q 
  puts ('n:')
  puts n  
  phi = (p-1) * (q-1)
  puts ('phi:')
  puts phi

  e = generate_e(phi) 
  puts ('e:')
  puts e
  dxy = EEA(phi,e)
  d = dxy[2] 

  if (d < 0) then 
    d += phi
  end
  
  puts ('d:')
  puts d 
  nde = [n,d,e]

  return nde
end

def signatureGenerator(x,n,d, e)
  #x is a String
  x = x.bytes#convert x to an ASCII array  
  y = []
  i = 0
  while i < x.length do
    y[i] = powerMod(x[i],d,n)    
    i = i + 1
  end
  return y
end

def signatureVerificator(x,y,n,d,e)
  #x is a String
  print("************hola***********************")
  x = x.bytes - [0]#convert x to an ASCII array
  print("bytes : \n")
  print(x)
  x2 = []
  i = 0
  while i < y.length do
    x2[i] = powerMod(y[i],e,n)  
    i = i + 1  
  end  

  puts x2
  puts ('******')
  puts x
  
  return (x == x2)

end

def gcd (a,b)
  while b != 0 do 
    temp = b
    b = a % b
    a = temp
  end  
  return a
end

def EEA (a,b)     
  if b == 0 then
    return [a,1,0] 
  else   
    q = a/b  
    d1x1y1 = EEA(b,(a % b))
    dxy = [d1x1y1[0], d1x1y1[2], (d1x1y1[1] - (q * d1x1y1[2]))]    
    
    return dxy
  end  
end

def generate_e (phi)  
  e = rand (2..phi-1)
  while ((gcd(e,phi)) != 1)  do       
    e = rand (2..phi-1)
  end  
  return e
end

def powerMod (a,b,n)
  b = b.to_s(2).split("").map { |n| n.to_i } #convert b to binary
  z = 1
  i = 0
  while i < b.length do
    if (b[i] == 1) then
      z = ((z*z) * a) % n
    else
      z = (z*z) % n
    end
    i = i + 1    
  end
  return z
end

nde = keysGenerator
n = nde[0]
d = nde[1]
e = nde[2]

x = '.!*sada?' #x is the message
y = signatureGenerator(x,n,d,e) #y is the signature
print("***\n")
print(y)
print("*****\n")
puts y
puts ('y:')
puts (signatureVerificator(x,y,n,d,e)) 

