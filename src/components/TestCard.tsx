interface TestItem {
  id: number;
  parentId: number | null;
}

interface ItemNodeProps extends TestItem {
  
  byParent: Map<number | null, TestItem[]>;

  className?: string;
  depth: number;
  maxDepth: number; // MOVE THIS INTO CONTEXT LATER FOR CONTROL
}

const TestCard = ({
  id,
  byParent,
  parentId,
  className,
  depth,
  maxDepth,
}: ItemNodeProps) => {
  // children are grouped in byParent by the parent ID
  const children = byParent.get(id) ?? null;
  return (
    <li className={`border w-fit p-1 ${className}`}>
      {id}: Task ID
      {parentId != null && <p>parent ID: {parentId}</p>}
      <p>Depth: {depth}</p>
      {children && depth < maxDepth && (
        <ul>
          {children.map((child) => (
            <TestCard
              key={child.id}
              id={child.id}
              parentId={child.parentId}
              byParent={byParent}
              depth={depth + 1}
              maxDepth={maxDepth}
            />
          ))}
        </ul>
      )}
    </li>
  );
};

export default TestCard;
