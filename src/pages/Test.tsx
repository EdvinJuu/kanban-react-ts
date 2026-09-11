import { useEffect, useState } from "react";

const testItems = [
  "You asked if",
  "you could see me",
  "before I went to",
  "Spain, you didn't",
  "give a reason didn't",
  "know what you would",
  "say. But I was hoping",
  "that my breath on your",
  "face would blow every",
  "last thing into place",
];

const Test = () => {
  const [items, setItems] = useState(testItems);
  const [dragged, setDragged] = useState<number | null>(null);

  const [mouse, setMouse] = useState<[number, number]>([0, 0]);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      setMouse([e.x, e.y]); // this gets mouse coordinates from the (e)
    };

    document.addEventListener("mousemove", handler); // how does handler get updated? How are the functions working together here?

    return () => document.removeEventListener("mousemove", handler); // Not sure how this one removes it at the end?
  }, []);

  return (
    <>
      {dragged !== null && (
        <div
          className="absolute shadow"
          style={{ left: `${mouse[0]}px`, top: `${mouse[1]}px` }}
        >
          {items[dragged]}
        </div>
      )}
      {/* Main List */}
      <div className="flex flex-col justify-center text-center border w-fit m-auto">
        {items.map((value, index) => (
          <>
            {dragged !== index && (
              <>
                <div
                  key={value}
                  className="border w-50 whitespace-nowrap cursor-pointer h-7 bg-white"
                  onMouseDown={(e) => {
                    e.preventDefault();
                    setDragged(index);
                  }}
                >
                  {value}
                </div>
                <div
                  className={`${dragged === null ? "hidden" : ""} border w-50 whitespace-nowrap cursor-pointer h-7 bg-gray-400 drop-zone`}
                />
              </>
            )}
          </>
        ))}
      </div>
    </>
  );
};

export default Test;
