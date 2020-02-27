KINV = ( [[118, 220, 171, 129, 124,],[28, 171, 36, 22, 31,],[168, 253, 71, 135, 196,],[113, 70, 40, 190, 251,],[82, 46, 188, 155, 49,]],
		 [[15, 29, 120, 80, 148],[210, 13, 117, 209, 49],[40, 61, 246, 195, 74],[169, 207, 138, 137, 199,],[ 84, 46, 89, 120, 54]],
		 [[165, 254, 251, 20, 44],[242, 193, 254, 205, 73],[79, 166, 130, 34, 137],[102, 173, 221, 113, 241],[48, 205, 94, 22, 162]],
		 [[39, 27, 175, 253, 144],[203, 39, 106, 139, 180],[121, 101, 204, 222, 35],[148, 212, 188, 129, 72],[150, 53, 145, 174, 64]],
		 [[157, 8, 191, 193, 25],[47, 103, 204, 180, 104],[96, 72, 87, 82, 150],[24, 210, 130, 137, 38],[116, 184, 120, 150, 73]],
		 [[76, 15, 5, 175, 122],[194, 124, 86, 190, 227],[198, 25, 108, 168, 87],[38, 132, 17, 6, 124],[205, 146, 13, 116, 159]],
		 [[0, 173, 151, 105, 113],[69, 235, 124, 35, 233],[139, 97, 12, 1, 162],[76, 167, 172, 12, 62],[43, 3, 129, 129, 33]],
		 [[170, 216, 59, 173, 116],[89, 216, 11, 160, 233],[2, 31, 143, 152, 213],[28, 142, 74, 145, 83],[107, 20, 219, 66, 194]],
		 [[61, 48, 48, 23, 153],[238, 44, 234, 231, 238],[118, 88, 25, 120, 213],[39, 124, 146, 196, 96],[63, 77, 232, 45, 239]],
		 [[8, 123, 80, 26, 188],[13, 193, 158, 190, 194],[191, 32, 19, 57, 240],[163, 220, 196, 61, 160],[14, 203, 31, 99, 229]],
		 [[255, 115, 187, 25, 158],[206, 171, 209, 71, 149],[67, 210, 182, 229, 161],[256, 78, 242, 48, 205],[49, 256, 53, 122, 201]],
 		 [[6, 63, 144, 138, 130],[248, 121, 131, 21, 199],[161, 223, 64, 0, 118],[248, 163, 146, 42, 159],[16, 148, 243, 162, 139]],
 		 [[174, 191, 167, 9, 218],[54, 90, 126, 24, 81],[32, 230, 197, 212, 80],[174, 24, 56, 133, 46],[187, 70, 208, 104, 10]],
 		 [[56, 132, 4, 128, 203],[138, 114, 255, 51, 155],[196, 78, 249, 34, 163],[164, 27, 124, 73, 234],[133, 231, 120, 204, 203]],
 		 [[170, 2, 222, 29, 198],[23, 20, 141, 107, 131],[186, 43, 38, 229, 128],[241, 76, 157, 45, 62],[218, 104, 189, 202, 177]],
 		 [[33, 86, 34, 83, 164],[111, 241, 221, 117, 98],[253, 227, 222, 82, 226],[160, 230, 88, 217, 131],[160, 186, 43, 156, 90]],
 		 [[123, 185, 102, 122, 137],[198, 89, 52, 153, 244],[180, 235, 235, 109, 165],[91, 48, 178, 242, 113],[90, 36, 136, 149, 123]]
	)

MATRIXSIZE = 5

def toAscii( string ):
	aux = []
	temp = ''
	for i in string:
		temp += i
		if len(temp) == 2:
			aux.append(int(temp,16))
			temp = ''		
	return aux

def getMatrixKey( passphrase ):
	hash = 1	
	passphrase = passphrase[0:8]	
	for i in passphrase:
		hash *= ord(i)	
	return  hash%17

def doInversePermutation( cipherText ):
	lenCip = len(cipherText)
	L = cipherText[0:int((lenCip+1)/2)]
	R = cipherText[int((lenCip+1)/2):lenCip]
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

def ownDescipher( cipherText, Invkey ):
	text=[]	
	joker = cipherText[-2]
	cipherText = toAscii(cipherText[0:-1])		
	block=[0]*MATRIXSIZE

	for i in range( len(cipherText) ):		
		block[ i%MATRIXSIZE ] = cipherText[i]
		if (i+1)%MATRIXSIZE == 0:
			text += cipherBlock(block,Invkey)
	plainText = ''.join(chr(e) for e in text)	
	plainText = doInversePermutation(plainText)
	lenTex = len(plainText)-int(joker)
	return plainText[0:lenTex]

#-----------------Main process------------------------

f = open("keymsg.out", "r")
if f.mode == 'r':
	contents = f.read().split("---")
f.close
	
ciphertxt = contents[0]
key =  contents[1]

def main():
	index = getMatrixKey(key)
	matrixKeyInv = KINV[index]
	plainText = ownDescipher(ciphertxt,matrixKeyInv)
	print(plainText)

if __name__ == "__main__":
	main()