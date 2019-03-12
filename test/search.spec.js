import { expect } from 'chai';
import Search from '../src/components/presentation/search.jsx';
describe('dsearch', () => {
  const list = [
    'banana',
    'apple',
    'mango',
    'kiwi',
    'peach',
    'apricot'
  ]
  const filterList = Search.prototype.filterList;
  it('returns the list with an empty string as parameters', () => { 
    const filteredLIst = filterList({list: list, value: ''});
    expect(filteredLIst).to.deep.equal(list);
  });
  it('returns an empty array', () => {
    const filteredLIst = filterList({list: list, value: 'z'});
    expect(filteredLIst).to.deep.equal([]);
  });
  it('returns all items with an "a" in them', () => {
    const stubResult = [
      'banana',
      'apple',
      'mango',
      'peach',
      'apricot'
    ]
    const filteredLIst = filterList({list: list, value: 'a'});
    expect(filteredLIst).to.deep.equal(stubResult);
  });
  it('returns all items with an "ap" in them', () => {
    const stubResult = [
      'apple',
      'apricot'
    ]
    const filteredLIst = filterList({list: list, value: 'ap'});
    expect(filteredLIst).to.deep.equal(stubResult);
  });
  it('returns an empty list', () => {
    const filteredLIst = filterList({list: list, value: 'peanut'});
    expect(filteredLIst).to.deep.equal([])
  })
});
