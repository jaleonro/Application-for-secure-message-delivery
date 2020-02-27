K = ( [[75, 199, 45, 255, 58],[55, 28, 173, 210, 254],[208, 117, 207, 142, 143],[231, 67, 229, 204, 87],[107, 77, 229, 234, 152]],
	  [[60, 41, 200, 159, 133],[113, 225, 84, 147, 133],[82, 156, 226, 214, 5],[197, 15, 229, 115, 169],[124, 23, 253, 138, 83]],
	  [[229, 89, 172, 51, 122],[48, 80, 212, 126, 63],[136, 37, 236, 231, 40],[3, 46, 173, 75, 103],[7, 235, 203, 51, 242]],
	  [[193, 80, 152, 125, 53],[113, 9, 100, 102, 255],[109, 51, 76, 190, 200],[124, 240, 136, 213, 16],[218, 21, 199, 165, 8]],
	  [[75, 90, 255, 169, 181],[181, 245, 45, 195, 163],[100, 156, 215, 218, 86],[150, 6, 168, 59, 248],[232, 156, 196, 114, 141]],
	  [[32, 17, 110, 165,  65],[142, 57, 163, 52, 76],[174, 132, 238, 157, 166],[115, 93, 215, 229, 130],[78, 87, 78, 70, 250]],
	  [[125, 74, 48, 54, 101],[112, 14, 166, 219, 60],[148, 19, 106, 2, 177],[249, 42, 181, 27, 169],[36, 75, 127, 192, 124]],
	  [[249, 233, 90, 39, 138],[45, 218, 137, 123, 234],[179, 231, 166, 87, 201],[14, 49, 186, 73, 113],[22, 139, 92, 108, 219]],
	  [[30, 18, 90, 25, 44],[45, 44, 152, 220, 117],[129, 99, 113, 221, 136],[220, 151, 14, 238, 132],[143, 29, 252, 97, 248]],
	  [[177, 59, 204, 134, 54],[213, 178, 100, 70, 112],[156, 160, 255, 53, 0],[37, 227, 208, 175, 214],[216, 43, 159, 170, 223]],
	  [[31, 39, 180, 185, 66],[134, 141, 89, 25, 213],[197, 83, 192, 120, 171],[211, 239, 181, 148, 194],[234, 212, 58, 255, 100]],
 	  [[63, 142, 247, 48, 162],[161, 30, 26, 114, 166],[75, 218, 102, 249, 123],[69, 25, 106, 118, 67],[131, 24, 38, 83, 134]],
 	  [[82, 226, 14, 38, 63],[85, 116, 233, 227, 136],[250, 64, 63, 194, 8],[40, 150, 44, 117, 18],[38, 237, 0, 154, 102]],
 	  [[69, 183, 23, 161, 103],[118, 251, 239, 65, 218],[195, 40, 29, 174, 108],[240, 171, 251, 66, 198],[111, 196, 88, 36, 32]],
 	  [[87, 57, 202, 146, 223],[47, 250, 169, 210, 28],[200, 219, 0, 185, 193],[17, 222, 210, 240, 32],[192, 123, 160, 151, 94]],
 	  [[245, 149, 133, 194, 237],[21, 53, 48, 212, 95],[90, 136, 230, 58, 67],[30, 35, 121, 42, 205],[140, 29, 53, 21, 19]],
 	  [[247, 99, 134, 200, 189],[141, 48, 164, 171, 20],[3, 160, 3, 123, 145],[193, 227, 220, 213, 126],[107, 9, 144, 9, 211]]
	)

MATRIXSIZE = 5

def toHexadecimal( array ):
	aux = ''
	for i in array:
		temp = hex(i).replace('0x','')
		if len(temp) == 1:
			temp = '0'+temp
		aux += temp
	return aux

def getMatrixKey( passphrase ):
	hash = 1	
	passphrase = passphrase[0:8]	
	for i in passphrase:
		hash *= ord(i)	
	return  hash%17

def completeMessage( message ):
	lenMes = len(message)	
	if lenMes%MATRIXSIZE != 0:
		spaces = MATRIXSIZE-lenMes % MATRIXSIZE		
		joker = spaces
		while spaces > 0:
			message += "#"
			spaces -= 1			
	return [message, joker]

def doPermutation( message ):
	lenMes = len(message)
	L = message[0:int(lenMes/2)]
	R = message[int(lenMes/2):lenMes]
	return R+L

def cipherBlock( block, key):
	if(len(block) == MATRIXSIZE ):
		cipher = [0]*MATRIXSIZE
	
		for i in range(MATRIXSIZE):
			for j in range(MATRIXSIZE):							
				cipher[i] = cipher[i]+(int(block[j])*key[j][i])
			cipher[i] = cipher[i]%256
		return cipher
	else:
		print ("Tamano de bloque inválido")		
	return

def ownCipher( message, key ):
	cipher= []
	[message,joker] = completeMessage(message)
	message = doPermutation(message)	
	lenMes = len(message)
	block=[0]*MATRIXSIZE
	for i in range(lenMes):
		block[ i%MATRIXSIZE ] = ord(message[i])
		if (i+1)%MATRIXSIZE == 0:
			cipher += cipherBlock(block,key)
	return toHexadecimal(cipher)+str(joker)

# ----------------------Main process----------------------

f = open("msg.out", "r")

if f.mode == 'r':
	contents = f.read().split("---")
f.close

message = contents[0]
key = contents[1]

def main():
	index = getMatrixKey(key)
	matrixKey = K[index]
	cipherText = ownCipher(message,matrixKey)
	print(cipherText)

if __name__ == "__main__":
	main()
