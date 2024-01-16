import { hash, compare } from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import randomatic from 'randomatic'

import { AsyncHandler } from '@interfaces/asyncHandler.interface';

/**
 * @method isEmpty
 * @param {String | Number | Object} value
 * @returns {Boolean} true & false
 * @description this value is Empty Check
 */
export const isEmpty = (value: string | number | object): boolean => {
  return value == null || value === '' || (typeof value === 'object' && !Object.keys(value).length);
};

/**
 * @method asyncHandler
 * @param {AsyncHandler} handler - Asynchronous request handler function
 * @returns {Function} Express middleware function with error handling
 * @description Wraps an asynchronous request handler with error handling middleware.
 * @typedef {Function} AsyncHandler - Asynchronous request handler function
 * @param {Request} req - Express request object
 * @param {Response} res - Express response object
 * @param {NextFunction} next - Express next middleware function
 * @throws {Error} Propagates any errors thrown by the asynchronous handler to the Express error handling middleware
 */
export const asyncHandler =
  (handler: AsyncHandler) =>
  async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      await handler(req, res, next);
    } catch (error) {
      next(error);
    }
  };

/**
 * @method camelCase
 * @param {string} text - Input text to convert to camel case
 * @returns {string} Camel case version of the input text
 * @description Converts a string to camel case format by removing spaces, underscores,
 *              hyphens, and dots, and capitalizing the first letter of each word except the first one.
 * @param {string} text - Input text to be transformed
 * @throws {TypeError} Throws an error if the input is not a string
 */
export const camelCase = (text: string): string => {
  text = text.replace(/[-_\s.]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
  return text.substr(0, 1).toLowerCase() + text.substr(1);
};

/**
 * @method capitalizeWords
 * @param {string} str - Input string to capitalize each word
 * @returns {string} Input string with the first letter of each word capitalized
 * @description Capitalizes the first letter of each word in a given string, transforming it into a title case format.
 * @param {string} str - Input string to be transformed
 * @throws {TypeError} Throws an error if the input is not a string
 */
export const capitalizeWords = (str: string): string => {
  return str
    .toLowerCase()
    .split(' ')
    .map(s => s.charAt(0).toUpperCase() + s.substring(1))
    .join(' ');
};

/**
 * @method hashPassword
 * @param {string} str - Input string to be hashed
 * @returns {Promise<string>} Hashed string using bcrypt
 * @description Hashes a given string using bcrypt with a cost factor of 10.
 * @throws {TypeError} Throws an error if the input is not a string
 */
export const hashPassword = async (str: string): Promise<string> => {
  return await hash(str, 10);
};

/**
 * @method comparePassword
 * @param {string} dbPassword - Hashed password stored in the database
 * @param {string} enteredPassword - Plain text password entered by the user
 * @returns {Promise<boolean>} True if the entered password matches the hashed password, false otherwise
 * @description Compares a hashed password stored in the database with a plain text password entered by the user.
 * @throws {TypeError} Throws an error if the input is not a string
 */
export const comparePassword = async (dbPassword: string, enteredPassword: string): Promise<boolean> => {
  return await compare(dbPassword, enteredPassword);
};

/**
 * @method generateRandom
 * @param {string} pattern - Pattern specifying the format of the generated random character string (default is 'Aa0')
 * @param {number} length - Length of the generated random character string (default is 8)
 * @returns {string} Random character string
 * @description Generates a random character string based on the provided pattern and length.
 */
export const generateRandom = (pattern: string = 'Aa0', length: number = 8): string => {
  return randomatic(pattern, length);
}
