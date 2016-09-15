
/**
 * @type integer
 * @minimum 1
 */
type PositiveInteger = number;

interface MyObject {
  num: PositiveInteger;
  /**
   * @items { "type": "integer", "minimum": 1 }
   */
  nums: PositiveInteger[];
}
