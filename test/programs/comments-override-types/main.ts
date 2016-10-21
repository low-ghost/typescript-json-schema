/**
 * An integer greater than one
 * @type integer
 * @minimum 1
 */
export type PositiveInteger = number;

export type Identifier = PositiveInteger | string;

export interface MyObject {
  /**
   * Property-level description
   * @additionalProperties false
   */
  user_id: PositiveInteger;
  user_ids: PositiveInteger[];
  /**
   * String or integer
   * @default n/a
   */
  identifier?: PositiveInteger | string;
  identifier_typed?: Identifier;
  tuple: [ PositiveInteger, string ];

}
