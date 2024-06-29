import { useEffect, useState } from "react";
import type { WineT } from "schemas/cellar";
import type { TastingT } from "schemas/tastings";

const LOAD_COUNT = 20;

export function useViewMore(list: TastingT[] | WineT[]) {
  const [moreAvailable, setMoreAvailable] = useState(true);
  const [viewable, setViewable] = useState<TastingT[] | WineT[]>([]);

  useEffect(() => {
    setViewable(list.slice(0, LOAD_COUNT));
    if (list.length <= LOAD_COUNT) {
      setMoreAvailable(false);
    }
  }, [list]);

  function handleShowMore(lastCount: number) {
    setViewable(list.slice(0, lastCount + LOAD_COUNT));
    if (list.length < lastCount + LOAD_COUNT) {
      setMoreAvailable(false);
    }
  }

  return {
    viewable,
    handleShowMore,
    moreAvailable,
  };
}
