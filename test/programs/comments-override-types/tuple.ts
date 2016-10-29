/**
 * A positive integer
 * @type integer
 * @minimum 1
 */
type PositiveInteger = number;
type Identifier = PositiveInteger | string;
type Tuple = [ PositiveInteger, Identifier ];

interface MyObject {
  tuple: [ PositiveInteger, Identifier ];
  tuple_typed: Tuple;
}
