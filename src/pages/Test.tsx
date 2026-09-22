import clsx from "clsx";
import { useEffect, useState } from "react";

const testItems = [
  "1. You asked if",
  "2. you could see me",
  "3. before I went to",
  "4. Spain, you didn't",
  "5. give a reason didn't",
  "6. know what you would",
  "7. say. But I was hoping",
  "8. that my breath on your",
  "9. face would blow every",
  "10. last thing into place",
];

// https://dev.to/h8moss/build-a-reorderable-list-in-react-29on
const Test = () => {
  const [items, setItems] = useState(testItems);
  const [dragged, setDragged] = useState<number | null>(null);
  const [mouse, setMouse] = useState<[number, number]>([0, 0]);
  const [dropZone, setDropZone] = useState(0);
  const [boundingRectTop, setBoundingRectTop] = useState(0);
  const [boundingRectLeft, setBoundingRectLeft] = useState(0);
  const [distToList, setDistToList] = useState([0, 0]);

  // INITIALIZE
  useEffect(() => {
    const elements = Array.from(document.getElementsByClassName("drop-zone"));
    const positionsX = elements.map((e) => e.getBoundingClientRect().left);
    const positionsY = elements.map((e) => e.getBoundingClientRect().top);

    return setDistToList([positionsX[0], positionsY[0]]);
  }, []);

  // GETS MOUSE POSITION
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse([e.x, e.y]); // this gets mouse coordinates from the (e)
    };

    document.addEventListener("mousemove", handler); // how does handler get updated? How are the functions working together here?

    return () => document.removeEventListener("mousemove", handler); // Not sure how this one removes it at the end?
  }, []);

  // GET CLOSEST DROP ZONE
  useEffect(() => {
    if (dragged !== null) {
      // get all drop zones
      const elements = Array.from(document.getElementsByClassName("drop-zone"));

      // get drop-zones y-axis position
      const positionsY = elements.map((e) => e.getBoundingClientRect().top);

      // gets difference between mouse y pos and each element
      const absDifferences = positionsY.map((v) => Math.abs(v - mouse[1]));

      // get the items closest to mouse
      let result = absDifferences.indexOf(Math.min(...absDifferences));

      if (result > dragged) result /* += 1 */;

      setDropZone(result);
      /* setDistToList(positionsX[0]); */
    }
  }, [dragged, mouse]);

  function moveItem<T>(list: T[], from: number, toGap: number): T[] {
    // Claude solution different from tutorial, to avoid bloated code
    // copy list into variable
    const copy = [...list];

    // remove targeted list item from list, this shifts the indexes for you
    const [item] = copy.splice(from, 1);

    // If you plucked the item out from before the target gap,
    //  the gap slid down by one, so subtract one.
    //  If you plucked it from after the gap, the gap didn't move, so leave it alone.
    copy.splice(toGap > from ? toGap - 1 : toGap, 0, item); // splicing with 0 items removed is just a pure insertion

    // - 2 DOESNT WORK GOING UP LIST, : TOGAP WOULD NEED TO BE OFFSET TOO BUT WONT LOOK GOOD

    return copy;
  }

  // DROP ITEM
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dragged !== null) {
        e.preventDefault();
        setDragged(null); 

        setItems((items) => moveItem([...items], dragged, dropZone));
      }
    };

    document.addEventListener("mouseup", handler);
    return () => document.removeEventListener("mouseup", handler);
  }, [dragged, dropZone]);

  /* Base Classes */
  const listItemBase = clsx(" w-50 whitespace-nowrap cursor-pointer");
  const listItemDropZone = clsx("overflow-hidden drop-zone");
  const listItemHidden = clsx("text-gray-700 p-0 h-0");
  const listItemTransition = clsx("transition-all duration-150 overflow-hidden")


  return (
    <>
      {/* On mouse hover box */}
      {dragged !== null && (
        <div
          className={`${listItemBase} flex justify-center bg-white absolute shadow`}
          style={{
            left: `${mouse[0] - boundingRectLeft}px`,
            top: `${mouse[1] - boundingRectTop}px`,
          }}
        >
          {items[dragged]}
        </div>
      )}

      {/* Main List */}
      <div className="flex flex-col justify-center text-center border w-fit mt-8 mx-auto">
        {/* drop zone before all items */}
        <div
          className={`${dragged === null || dropZone !== 0 ? `${listItemHidden}` : "h-7"}  ${listItemBase} ${listItemDropZone} bg-gray-400`}
        />

        {items.map((value, index) => (
          <>
            {/* dragged !== index &&  */(
              <>
                {/* List Card */}
                <div
                  key={value}
                  className={` ${listItemBase} h-7 border bg-white`}
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setDragged(index);

                    /* Opencode solution, good simplification instead of 2 functions handling it */
                    const rect = e.currentTarget.getBoundingClientRect();
                    setBoundingRectLeft(e.clientX - rect.left);
                    setBoundingRectTop(e.clientY - rect.top);
                    /* 
                    setBoundingRectTop((mouse[1] - distToList[1]) % 28 );
                    setBoundingRectLeft(mouse[0] - distToList[0]); */
                  }}
                >
                  {value}
                </div>
                {/* Drop zone */}
                <div
                  className={`${dragged === null || dropZone !== index + 1 ? `${listItemHidden}` : "h-7"} ${listItemTransition}  ${listItemBase} ${listItemDropZone} bg-gray-400`}
                />
                {/* index+1 accounts for the dropZone on top */}
              </>
            )}
          </>
        ))}
      </div>
      <p>
        {boundingRectLeft} - {mouse[0]} = {boundingRectLeft}
      </p>
      <p>drop zone: {dropZone}</p>
      <p>dragged: {dragged === null ? "Null" : dragged}</p>
      <p>list total: {items.length}</p>
    </>
  );
};

export default Test;
