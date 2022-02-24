﻿using System;
using System.Security.Cryptography;
using System.Text;

namespace Admin.Common.Helpers
{
    public static class Password
    {
        public static string ComputeHash(string plainText, string hashAlgorithm, byte[] saltBytes)
        {
            // If salt is not specified, generate it on the fly.
            if ((saltBytes == null))
            {

                // Define min and max salt sizes.
                int minSaltSize;
                int maxSaltSize;

                minSaltSize = 4;
                maxSaltSize = 8;

                // Generate a random number for the size of the salt.
                Random random;
                random = new Random();

                int saltSize;
                saltSize = random.Next(minSaltSize, maxSaltSize);

                // Allocate a byte array, which will hold the salt.
                saltBytes = new byte[saltSize - 1 + 1];

                // Initialize a random number generator.
                RNGCryptoServiceProvider rng;
                rng = new RNGCryptoServiceProvider();

                // Fill the salt with cryptographically strong byte values.
                rng.GetNonZeroBytes(saltBytes);
            }

            // Convert plain text into a byte array.
            byte[] plainTextBytes;
            plainTextBytes = Encoding.UTF8.GetBytes(plainText);

            // Allocate array, which will hold plain text and salt.
            byte[] plainTextWithSaltBytes = new byte[plainTextBytes.Length + saltBytes.Length - 1 + 1];

            // Copy plain text bytes into resulting array.
            int I;
            for (I = 0; I <= plainTextBytes.Length - 1; I++)
                plainTextWithSaltBytes[I] = plainTextBytes[I];

            // Append salt bytes to the resulting array.
            for (I = 0; I <= saltBytes.Length - 1; I++)
                plainTextWithSaltBytes[plainTextBytes.Length + I] = saltBytes[I];

            // Because we support multiple hashing algorithms, we must define
            // hash object as a common (abstract) base class. We will specify the
            // actual hashing algorithm class later during object creation.
            HashAlgorithm hash;

            // Make sure hashing algorithm name is specified.
            if ((hashAlgorithm == null))
                hashAlgorithm = "";

            // Initialize appropriate hashing algorithm class.
            switch (hashAlgorithm.ToUpper())
            {
                case "SHA1":
                    {
                        hash = new SHA1Managed();
                        break;
                    }

                case "SHA256":
                    {
                        hash = new SHA256Managed();
                        break;
                    }

                case "SHA384":
                    {
                        hash = new SHA384Managed();
                        break;
                    }

                case "SHA512":
                    {
                        hash = new SHA512Managed();
                        break;
                    }

                default:
                    {
                        hash = new MD5CryptoServiceProvider();
                        break;
                    }
            }

            // Compute hash value of our plain text with appended salt.
            byte[] hashBytes;
            hashBytes = hash.ComputeHash(plainTextWithSaltBytes);

            // Create array which will hold hash and original salt bytes.
            byte[] hashWithSaltBytes = new byte[hashBytes.Length + saltBytes.Length - 1 + 1];

            // Copy hash bytes into resulting array.
            for (I = 0; I <= hashBytes.Length - 1; I++)
                hashWithSaltBytes[I] = hashBytes[I];

            // Append salt bytes to the result.
            for (I = 0; I <= saltBytes.Length - 1; I++)
                hashWithSaltBytes[hashBytes.Length + I] = saltBytes[I];

            // Convert result into a base64-encoded string.
            string hashValue;
            hashValue = Convert.ToBase64String(hashWithSaltBytes);

            // Return the result.
            return hashValue;
        }

        public static bool VerifyHash(string plainText, string hashAlgorithm, string hashValue)
        {

            // Convert base64-encoded hash value into a byte array.
            byte[] hashWithSaltBytes;
            hashWithSaltBytes = Convert.FromBase64String(hashValue);

            // We must know size of hash (without salt).
            int hashSizeInBits;
            int hashSizeInBytes;

            // Make sure that hashing algorithm name is specified.
            if ((hashAlgorithm == null))
                hashAlgorithm = "";

            // Size of hash is based on the specified algorithm.
            switch (hashAlgorithm.ToUpper())
            {
                case "SHA1":
                    {
                        hashSizeInBits = 160;
                        break;
                    }

                case "SHA256":
                    {
                        hashSizeInBits = 256;
                        break;
                    }

                case "SHA384":
                    {
                        hashSizeInBits = 384;
                        break;
                    }

                case "SHA512":
                    {
                        hashSizeInBits = 512;
                        break;
                    }

                default:
                    {
                        hashSizeInBits = 128;
                        break;
                    }
            }

            // Convert size of hash from bits to bytes.
            hashSizeInBytes = Convert.ToInt32(hashSizeInBits / (double)8);

            // Make sure that the specified hash value is long enough.
            if ((hashWithSaltBytes.Length < hashSizeInBytes))
                return false;

            // Allocate array to hold original salt bytes retrieved from hash.
            byte[] saltBytes = new byte[hashWithSaltBytes.Length - hashSizeInBytes - 1 + 1];

            // Copy salt from the end of the hash to the new array.
            int I;
            for (I = 0; I <= saltBytes.Length - 1; I++)
                saltBytes[I] = hashWithSaltBytes[hashSizeInBytes + I];

            // Compute a new hash string.
            string expectedHashString;
            expectedHashString = ComputeHash(plainText, hashAlgorithm, saltBytes);

            // If the computed hash matches the specified hash,
            // the plain text value must be correct.
            return (hashValue == expectedHashString);
        }
    }
}
