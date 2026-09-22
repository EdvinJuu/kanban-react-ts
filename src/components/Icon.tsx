// https://benadam.me/thoughts/react-svg-sprites/ AND https://kurtextrem.de/posts/svg-in-js

import type { SVGProps } from "react";
import clsx from "clsx";

interface IconProps extends SVGProps<SVGSVGElement> {
  id: string;
  // SVGProps covers what can be destructured from ...props so no need to check.
}

function Icon({ id, ...props }: IconProps) {
  const classBase = clsx("");

  return (
    <div className={`${classBase}`}>
      <svg {...props}>
        <use href={`/icons.svg#${id}`} />{" "}
        {/* icons imported from public folder in order to avoid it being converted by V+ite */}
      </svg>
    </div>
  );
}

export default Icon;
