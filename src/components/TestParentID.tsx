import TestCard from "./TestCard";

interface TestItem {
  id: number;
  parentId: number | null;
}

const TestParentId = () => {
  const testList: TestItem[] = [
    { id: 1, parentId: 2 },
    { id: 2, parentId: 3 },
    { id: 3, parentId: 4 },
    { id: 4, parentId: null },
    { id: 5, parentId: null },
    { id: 6, parentId: 4 },
    { id: 7, parentId: 4 },
    { id: 8, parentId: 4 },
    { id: 9, parentId: 4 },
  ];

  // go through each item in the list. add item with map.get to a list where the parentId matches
  // if it doens't match, create a new list(?? []). Then update the list with the parentId key to include the item.
  // for an initial value create new Map object
  const byParentReduce = testList.reduce((map, item) => {
    const siblings = map.get(item.parentId) ?? [];
    map.set(item.parentId, [...siblings, item]);
    return map;
  }, new Map<number | null, TestItem[]>());


  return (
    <ul className="flex">
      {(byParentReduce.get(null) ?? []).map( // (byParentReduce.get(null) ?? []) extra parentheses makes sure that is evaluated first before map reads it.
        (
          child, 
        ) => (
          <TestCard
            key={child.id}
            id={child.id}
            byParent={byParentReduce}
            className=""
            depth={0}
            maxDepth={1}
            parentId={null}
          />
        ),
      )}
    </ul>
  );
};

export default TestParentId;
