#include<iostream>
#include<string>
#include<bitset>
#include<vector>
#include<algorithm>
#include<assert.h>
#include<fstream>

#define KEY_SZ 64
#define KEY_PERM_TABLE_SZ 56
using namespace std;

const bool TEST = true;

vector<bitset<8>> str_to_bin_vector(string str);
vector<bitset<64>> concatenate_bitsets(vector<bitset<8>> binaries);
void print_bitset_vector(vector<bitset<8>>);
void print_bitset_vector64(vector<bitset<64>>);
bitset<56> key_permutation(bitset<64> key);
vector<pair<bitset<28>, bitset<28>>> generate_subkeys(bitset<56> k_plus);
bitset<28> shift_left(bitset<28> half_key, size_t pos);
vector<bitset<56>> concatenate_subkeys(vector<pair<bitset<28>, bitset<28>>> subkeys);
vector<bitset<48>> subkey_permutation(vector<bitset<56>> subkeys);

vector<bitset<8>> get_demo_message(string bit_string);
string bits_to_string(vector<bitset<64>> bits);
void write_to_file(vector<bitset<64>> bin);
bitset<64> msg_permutation(bitset<64> msg);
pair<bitset<32>, bitset<32>> split_msg_LR(bitset<64> msg);
bitset<48> expand_32_to_48(bitset<32> blk);
bitset<32> round_function(bitset<48> key, bitset<32> half);
vector<bitset<4>> compute_s_box(vector<bitset<6>> subblocks);
bitset<32> concatenate_s_box_output(vector<bitset<4>> sb_out);
bitset<32> s_box_permutation(bitset<32> sb_concat);
bitset<64> concatenate_after_16_rounds(bitset<32> R, bitset<32> L);
bitset<64> last_permutation(bitset<64> final_concatenation);

const int byte_size = 8;

int main(int argc, char *argv[]) {
    // All output is reversed
    vector<bitset<8>> bin_message;
    vector<bitset<8>> bin_key;
    if(!TEST) {
        string message;
        string key;
        if (argc == 1) {
            cout <<  "message: " << endl;
            getline(cin, message);
            cout << "key: " << endl;
            getline(cin, key);
        } else {
            message = argv[2];
            key = argv[1];
        }
        bin_message = str_to_bin_vector(message);
        bin_key = str_to_bin_vector(key);
    } else {
        bin_message = get_demo_message("0000000100100011010001010110011110001001101010111100110111101111");
        bin_key = get_demo_message("0001001100110100010101110111100110011011101111001101111111110001");
    }




    // Step 1: Create 16 subkeys, each of which is 48-bits long.
    vector<bitset<64>> kblocks = concatenate_bitsets(bin_key);
    bitset<56> k_plus = key_permutation(kblocks[0]); // only use the first 64 of the key...
    vector<pair<bitset<28>, bitset<28>>> subkeys = generate_subkeys(k_plus);
    vector<bitset<56>> keys = concatenate_subkeys(subkeys);
    vector<bitset<48>> subkeys_permutated = subkey_permutation(keys); // These are the keys that will be used in next step

    // Step 2: Encode each 64-bit block of data.
    vector<bitset<64>> msg_blocks = concatenate_bitsets(bin_message);
    vector<bitset<64>> encrypted_blocks;
    for(int i = 0; i < msg_blocks.size(); i++) {
        bitset<64> msg_perm = msg_permutation(msg_blocks[i]);
        // 16 rounds
        pair<bitset<32>, bitset<32>> LR = split_msg_LR(msg_perm);
        bitset<32> L = LR.first;
        bitset<32> R = LR.second;
        for(int i = 0; i < 16; i++) {
            bitset<32> tmp_L = L;
            /* print test
            cout << "in: " << L << " " << R << endl;
            */
            L = R;
            R = tmp_L^round_function(subkeys_permutated[i], R);
            /* print test
            cout << "ou: " << L << " " << R << endl;
            */
        }
        bitset<64> final_concatenation = concatenate_after_16_rounds(R, L); // note that in this concatenation we put first R and then L
        bitset<64> encrypted_blk = last_permutation(final_concatenation);

        encrypted_blocks.push_back(encrypted_blk);
    }
    string chars = bits_to_string(encrypted_blocks); // Mostly of the chars are non-printable, so view the output file
    cout << chars << endl;
    cout << " *! Mostly of the chars are non-printable, so review the output file." << endl;
    write_to_file(encrypted_blocks);
    return 0;
}

vector<bitset<8>> get_demo_message(string bits) {
    string demo_msg = bits;

    vector<bitset<8>> msg;

    string str_chunk = "";
    for(int i = 0; i < demo_msg.size(); i++) {
        str_chunk += demo_msg[i];
        if((i +  1)%8 == 0) {
            reverse(str_chunk.begin(), str_chunk.end());
            bitset<8> bit_chunk(str_chunk);
            msg.push_back(bit_chunk);
            str_chunk = "";
            bit_chunk.reset();
        }
    }
    return msg;
}

// translates bits (taken by byte) to string. Some of the characters are non printable, for this reason avoid this conversion....
string bits_to_string(vector<bitset<64>> bits) {
    string str = "";
    char c;
    bitset<8> byte;
    for(auto it = bits.begin(); it != bits.end(); it++)
        for(int i = 0, j = 0; i < 64; i++, j++) {
            byte.set(j, (*it)[i]);
            if((i + 1)%8 == 0) {
                // reverse byte to correctly get the ulong number
                bitset<8> tmp_byte = byte;
                byte.set(0, tmp_byte[7]);
                byte.set(1, tmp_byte[6]);
                byte.set(2, tmp_byte[5]);
                byte.set(3, tmp_byte[4]);
                byte.set(4, tmp_byte[3]);
                byte.set(5, tmp_byte[2]);
                byte.set(6, tmp_byte[1]);
                byte.set(7, tmp_byte[0]);
                // byte ~> char
                c = char(byte.to_ulong());
                str += c;
                byte.reset();
                j = -1;
            }
        }
    return str;
}

// outputs the contents of binaries vector to a file.
void write_to_file(vector<bitset<64>> bin) {
    ofstream file;
    file.open("cyphertext.txt");
    for(auto it = bin.begin(); it != bin.end(); it++)
        for(int j = 0; j < 64; j++)
            file << (*it)[j];
    file.close();
}

// each char in str is converted to bitset
vector<bitset<8>> str_to_bin_vector(string str) {
    vector<bitset<8>> bin_values;
    for(size_t i = 0; i < str.size(); i++) {
        bitset<8> binchar(str.c_str()[i]); // the conversion does not invert the order of bits e.g. A = 0110 0001 and after bitset translation remains 0110 0001
        bin_values.push_back(binchar);
    }
    return bin_values;
}

void print_bitset_vector(vector<bitset<8>> binaries) {
    for(size_t i = 0; i < binaries.size(); i++) {
        cout << binaries[i] << endl;
    }
}

void print_bitset_vector64(vector<bitset<64>> binaries) {
    for(size_t i = 0; i < binaries.size(); i++) {
        cout << binaries[i] << endl;
    }
}

// Note everything goes from right to left
// concatenate bitsets in blocks of 64 bits
vector<bitset<64>> concatenate_bitsets(vector<bitset<8>> binaries) {
    vector<bitset<64>> blocks;
    bitset<64> concatenation;

    vector<bitset<8>>::iterator it = binaries.begin();
    int concat_ptr = 0;
    while(it != binaries.end()){
        if (concat_ptr == 64) {
            blocks.push_back(concatenation);
            concat_ptr = 0;
            concatenation.reset();
        }
        for(int k = 0; k < 8; k++, concat_ptr++)
            concatenation.set(concat_ptr, (*it)[k]);// bitset indexing starts from right
        it++;
    }
    blocks.push_back(concatenation);
    return blocks;
}


/**************************************************************
 * Step 1: Create 16 subkeys, each of which is 48-bits long.  *
 **************************************************************/
// Note everything goes from right to left
// Step 1.1 Initial permutation of the key
bitset<56> key_permutation(bitset<64> key) {
    bitset<56> pkey;
    int perm_table[KEY_PERM_TABLE_SZ] = {57, 49, 41, 33, 25, 17,  9,
                                          1, 58, 50, 42, 34, 26, 18,
                                         10,  2, 59, 51, 43, 35, 27,
                                         19, 11,  3, 60, 52, 44, 36,
                                         63, 55, 47, 39, 31, 23, 15,
                                          7, 62, 54, 46, 38, 30, 22,
                                         14,  6, 61, 53, 45, 37, 29,
                                         21, 13,  5, 28, 20, 12, 4}; // idx = {i | i = 1 ... 64}
    for(int i = 0; i < KEY_PERM_TABLE_SZ; i++)
        pkey[i] = key[perm_table[i] - 1];

    /* print test
    cout << "i p k" << endl;
    for(int i = 0; i < 56; i++)
        cout << (i + 1) << " " << pkey[i] << " " << key[i] << " | k[" << perm_table[i] << "] = " << key[perm_table[i] - 1] << endl;
    */
    return pkey;
}

// generate the 28 pair of subkeys from the first permutation of the key.
vector<pair<bitset<28>, bitset<28>>> generate_subkeys(bitset<56> k_plus) {
    unsigned schedule[16] = {1, 1, 2, 2, 2, 2, 2, 2, 1, 2, 2, 2, 2, 2, 2, 1};

    vector<pair<bitset<28>, bitset<28>>> subkeys;
    // split the key
    bitset<28> C;
    bitset<28> D;
    for(int i = 0; i < 28; i++)
        C[i] = k_plus[i];
    for(int i = 0; i < 28; i++)
        D[i] = k_plus[i + 28];
    // subkeys.push_back(pair<bitset<28>, bitset<28>>(C, D)); // in DES the intial split is not used!!!!
    // append shifted subkeys
    for(int i = 0; i < 16; i++) {
        C = shift_left(C, schedule[i]);
        D = shift_left(D, schedule[i]);
        subkeys.push_back(pair<bitset<28>, bitset<28>>(C,D));
        /* print test
        cout << "C: " << subkeys[i].first << " D: " << subkeys[i].second << endl;
        */
    }
    return subkeys;
}

// shifts to the left the given bitset pos times, as DES shiftS to the left and
// bitsets are inverted, here we shift to the RIGHT!
bitset<28> shift_left(bitset<28> half_key, size_t pos) {
    int tmp = 0;
    for(int i = 0; i < pos; i++) {
        tmp = half_key[0];
        half_key >>= 1;
        half_key.set(27, tmp);
    }
    return half_key;
}

// concatenate the C_i D_i subkeys generated by above function
vector<bitset<56>> concatenate_subkeys(vector<pair<bitset<28>, bitset<28>>> subkeys) {
    vector<bitset<56>> keys;
    bitset<56> concat;
    auto it = subkeys.begin();
    while(it != subkeys.end()) {
        for(int i = 0; i < 28; i++)
            concat.set(i, (*it).first[i]);
        for(int i = 0; i < 28; i++)
            concat.set(i + 28, (*it).second[i]);
        it++;
        keys.push_back(concat);
        /* print test
        cout << "C + D: " << concat << endl;
        */
    }
    return keys;
}

vector<bitset<48>> subkey_permutation(vector<bitset<56>> subkeys) {
    size_t perm_table[48] = { 14,   17,  11,   24,    1,   5,
                               3,   28,  15,    6,   21,  10,
                              23,   19,  12,    4,   26,   8,
                              16,    7,  27,   20,   13,   2,
                              41,   52,  31,   37,   47,  55,
                              30,   40,  51,   45,   33,  48,
                              44,   49,  39,   56,   34,  53,
                              46,   42,  50,   36,   29,  32 }; // indexing starts from 1
    vector<bitset<48>> permutated_keys;
    bitset<48> permutation;
    for(int i = 0; i < subkeys.size(); i++) {
        permutation.reset();
        for(int j = 0; j < 48; j++)
            permutation.set(j, subkeys[i][perm_table[j] - 1]);
        permutated_keys.push_back(permutation);
        /* print test
        cout << permutation << endl;
        */
    }
    return permutated_keys;
}

/**********************************************
 * Step 2: Encode each 64-bit block of data.  *
 **********************************************/
// This is the initial permutation of message block
bitset<64> msg_permutation(bitset<64> msg) {
    size_t perm_table[64] = { 58,   50,  42,   34,   26,  18,   10,   2,
                              60,   52,  44,   36,   28,  20,   12,   4,
                              62,   54,  46,   38,   30,  22,   14,   6,
                              64,   56,  48,   40,   32,  24,   16,   8,
                              57,   49,  41,   33,   25,  17,    9,   1,
                              59,   51,  43,   35,   27,  19,   11,   3,
                              61,   53,  45,   37,   29,  21,   13,   5,
                              63,   55,  47,   39,   31,  23,   15,   7};
    bitset<64> perm_msg;
    for(int i = 0; i < 64; i++)
        perm_msg[i] = msg[perm_table[i] - 1];
    /* print test
    cout << perm_msg << endl;
    */
    return perm_msg;
}

// Here we split in two (L, R) the permuted message block
pair<bitset<32>, bitset<32>> split_msg_LR(bitset<64> msg) {
    bitset<32> L, R;
    for(int i = 0; i < 32; i++)
        L[i] = msg[i];
    for(int i = 0; i < 32; i++)
        R[i] = msg[i + 32];
    return pair<bitset<32>, bitset<32>> (L, R);
}

// Expansion from 32 bits to 48 bitset
bitset<48> expand_32_to_48(bitset<32> blk) {
    size_t e_bit_table[48] = { 32,    1,   2,    3,    4,   5,
                                4,    5,   6,    7,    8,   9,
                                8,    9,  10,   11,   12,  13,
                               12,   13,  14,   15,   16,  17,
                               16,   17,  18,   19,   20,  21,
                               20,   21,  22,   23,   24,  25,
                               24,   25,  26,   27,   28,  29,
                               28,   29,  30,   31,   32,   1 };
    bitset<48> expansion;
    for(size_t i = 0; i < 48; i++)
        expansion[i] = blk[e_bit_table[i] - 1];
    /* print test
    cout << blk << endl;
    cout << expansion << endl;
    */
    return expansion;
}

// This is the f function that operates inside of each loop
bitset<32> round_function(bitset<48> key, bitset<32> half) {
    // xor
    bitset<48> half_expanded = expand_32_to_48(half);
    bitset<48> xor_result = key^half_expanded;
    // split in eight blocks of six
    vector<bitset<6>> blocks;
    bitset<6> blk;
    for(int i = 0, j = 0; i < 48; i++, j++) {
        blk.set(j, xor_result[i]);
        if((i + 1)%6 == 0) {
            j = -1;
            blocks.push_back(blk);
            /* print test
            cout << blk << endl;
            blk.reset();
            */
        }
    }
    vector<bitset<4>> s_box_out = compute_s_box(blocks);
    bitset<32> s_box_concat = concatenate_s_box_output(s_box_out);
    bitset<32> s_box_perm = s_box_permutation(s_box_concat);

    /* print test (in correct fashion!! (left ~> right))
    cout << endl;
    for(int i = 0; i < 48; i++) {
        cout << xor_result[i];
        if((i + 1)%6 == 0)
            cout << " ";
    }
    */
    return s_box_perm;
}

const int s_box[8][4][16] = {
    { // s-box 1
        {14, 4, 13, 1,  2,15, 11, 8,  3,10,  6,12,  5, 9,  0, 7},
        {0,15,  7, 4, 14, 2, 13, 1, 10, 6, 12,11,  9, 5,  3, 8 },
        {4, 1, 14, 8, 13, 6,  2,11, 15,12,  9, 7,  3,10,  5, 0 },
        {15,12,  8, 2,  4, 9,  1, 7,  5,11,  3,14, 10, 0,  6,13}
    },
    { // s-box 2
        {15, 1, 8, 14,  6,11,  3, 4,  9, 7,  2,13, 12, 0,  5,10},
        {3,13, 4,  7, 15, 2,  8,14, 12, 0,  1,10,  6, 9, 11, 5},
        { 0,14, 7, 11, 10, 4, 13, 1,  5, 8, 12, 6,  9, 3,  2,15},
        {13, 8,10,  1,  3,15,  4, 2, 11, 6,  7,12,  0, 5, 14, 9}
    },
    { // s-box 3
        {10, 0,  9,14,  6, 3, 15, 5,  1,13, 12, 7, 11, 4,  2, 8},
        {13, 7,  0, 9,  3, 4,  6,10,  2, 8,  5,14, 12,11, 15, 1},
        {13, 6,  4, 9,  8,15,  3, 0, 11, 1,  2,12,  5,10, 14, 7},
        {1,10, 13, 0,  6, 9,  8, 7,  4,15, 14, 3, 11, 5,  2, 12}
    },
    { // s-box 4
         { 7,13, 14, 3,  0, 6,  9,10,  1, 2,  8, 5, 11,12,  4,15},
         {13, 8, 11, 5,  6,15,  0, 3,  4, 7,  2,12,  1,10, 14, 9},
         {10, 6,  9, 0, 12,11,  7,13, 15, 1,  3,14,  5, 2,  8, 4},
         {3,15,  0, 6, 10, 1, 13, 8,  9, 4,  5,11, 12, 7,  2, 14}
    },
    { // s-box 5
         { 2,12,  4, 1,  7,10, 11, 6,  8, 5,  3,15, 13, 0, 14, 9},
         {14,11,  2,12,  4, 7, 13, 1,  5, 0, 15,10,  3, 9,  8, 6},
         { 4, 2,  1,11, 10,13,  7, 8, 15, 9, 12, 5,  6, 3,  0,14},
         {11, 8, 12, 7,  1,14,  2,13,  6,15,  0, 9, 10, 4,  5, 3}
    },
    { // s-box 6
         {12, 1, 10,15,  9, 2,  6, 8,  0,13,  3, 4, 14, 7,  5,11},
         {10,15,  4, 2,  7,12,  9, 5,  6, 1, 13,14,  0,11,  3, 8},
         { 9,14, 15, 5,  2, 8, 12, 3,  7, 0,  4,10,  1,13, 11, 6},
         { 4, 3,  2,12,  9, 5, 15,10, 11,14,  1, 7,  6, 0,  8,13}
     },
     { // s-box 7
         { 4,11,  2,14, 15, 0,  8,13,  3,12,  9, 7,  5,10,  6, 1},
         {13, 0, 11, 7,  4, 9,  1,10, 14, 3,  5,12,  2,15,  8, 6},
         { 1, 4, 11,13, 12, 3,  7,14, 10,15,  6, 8,  0, 5,  9, 2},
         { 6,11, 13, 8,  1, 4, 10, 7,  9, 5,  0,15, 14, 2,  3,12}
     },
     { // s-box 8
         {13, 2,  8, 4,  6,15, 11, 1, 10, 9,  3,14,  5, 0, 12, 7},
         { 1,15, 13, 8, 10, 3,  7, 4, 12, 5,  6,11,  0,14,  9, 2},
         { 7,11,  4, 1,  9,12, 14, 2,  0, 6, 10,13, 15, 3,  5, 8},
         { 2, 1, 14, 7,  4,10,  8,13, 15,12,  9, 0,  3, 5,  6,11}
     }
};

// Get the S-box transformation
vector<bitset<4>> compute_s_box(vector<bitset<6>> subblocks) {
    assert(subblocks.size() == 8);
    vector<bitset<4>> result;
    int sb = 0;
    for(vector<bitset<6>>::iterator blk = subblocks.begin(); blk != subblocks.end(); blk++, sb++) {
        bitset<2> i;
        bitset<4> j;
        // the bits are setted in this way (reversed) because bitset do no perform the translation in reverse manner...
        i.set(0, (*blk)[5]);
        i.set(1, (*blk)[0]);

        j.set(0, (*blk)[4]);
        j.set(1, (*blk)[3]);
        j.set(2, (*blk)[2]);
        j.set(3, (*blk)[1]);

        size_t s_output = s_box[sb][i.to_ulong()][j.to_ulong()];
        // s_temp will be reversed in order to be consistent with right to left reading of bitset
        bitset<4> s_temp(s_output);
        bitset<4> s_value;
        s_value.set(0, s_temp[3]);
        s_value.set(1, s_temp[2]);
        s_value.set(2, s_temp[1]);
        s_value.set(3, s_temp[0]);
        /* print test
        cout << s_value << " " << s_output << endl;
        */
        result.push_back(s_value);
    }
    return result;
}

// Concatenate the S-box transformation
bitset<32> concatenate_s_box_output(vector<bitset<4>> sb_out) {
    assert(sb_out.size() == 8);
    bitset<32> concat;
    size_t concat_ptr = 0;
    for(auto it = sb_out.begin(); it != sb_out.end(); it++) {
        for(size_t i = 0; i < 4; i++, concat_ptr++) {
            concat.set(concat_ptr, (*it)[i]);
        }
    }
    /* print test
    cout << concat << endl;
    */
    return concat;
}

// s-box permutation()
bitset<32> s_box_permutation(bitset<32> sb_concat) {
    size_t perm_table[32] = {
        16,  7, 20, 21,
        29, 12, 28, 17,
         1, 15, 23, 26,
         5, 18, 31, 10,
         2,  8, 24, 14,
        32, 27,  3,  9,
        19, 13, 30,  6,
        22, 11,  4, 25,
    };
    bitset<32> perm;
    for(size_t i = 0; i < 32; i++)
        perm.set(i, sb_concat[perm_table[i] - 1]);
    /* print test
        cout << perm << endl;
    */
    return perm;
}

// concatenate L R after 16 rounds of interchanging and applying function f
bitset<64> concatenate_after_16_rounds(bitset<32> R, bitset<32> L) {
    bitset<64> concat;
    for(int i = 0; i < 32; i++)
        concat.set(i, R[i]);
    for(int i = 0; i < 32; i++)
        concat.set(i + 32, L[i]);
    /* print test
    cout << concat << endl;
    */
    return concat;
}

// permform the last permutation (IP-1)
bitset<64> last_permutation(bitset<64> final_concatenation) {
    const int perm_table[64] = {
                    40,    8,  48,   16,   56,  24,   64,  32,
                    39,    7,  47,   15,   55,  23,   63,  31,
                    38,    6,  46,   14,   54,  22,   62,  30,
                    37,    5,  45,   13,   53,  21,   61,  29,
                    36,    4,  44,   12,   52,  20,   60,  28,
                    35,    3,  43,   11,   51,  19,   59,  27,
                    34,    2,  42,   10,   50,  18,   58,  26,
                    33,    1,  41,    9,   49,  17,   57,  25
    };
    bitset<64> final_permutation;
    for(int i = 0; i < 64; i++)
        final_permutation.set(i, final_concatenation[perm_table[i] - 1]);
    /* print test
    cout << final_permutation << endl;
    */
    return final_permutation;
}
