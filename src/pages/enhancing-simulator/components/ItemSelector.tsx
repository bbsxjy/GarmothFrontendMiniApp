import React, { useState } from "react";
import { useGetEnhancingSimulatorItemsQuery } from "@/api/enhanceing-simulator/itemSelectorApi";

const ItemSelector: React.FC = () => {
  const [selectedItem, setSelectedItem] = useState<string | null>(null);
  const [selectedLevel, setSelectedLevel] = useState("TET (IV)");
  const { data,error, isLoading }: any = useGetEnhancingSimulatorItemsQuery({});

  React.useEffect(() => {
    if (data && data.enhancingSimulator && !selectedItem) {
      setSelectedItem(data.enhancingSimulator[0].name); 
    }
  }, [data, selectedItem]);

  const levels = ["PRI (I)", "DUO (II)", "TRI (III)", "TET (IV)", "PEN (V)"];

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading items</div>;

  return (
    <div className="mb-3 flex gap-2">
      <div className="relative flex-none overflow-hidden h-10 w-10 bg-700 rounded border-2 border-rarity-5">
        {selectedItem && (
          <img
            src={
              data?.enhancingSimulator.find(
                (item: any) => item.name === selectedItem
              )?.imgSrc
            }
            alt={selectedItem}
            className="size-10"
          />
        )}
        <span className="enhance-level text-base">{selectedLevel}</span>
      </div>

      <div className="group w-full">
        <select
          value={selectedItem ?? ""}
          onChange={(e) => setSelectedItem(e.target.value)}
          className="rounded-md h-10 items-center justify-between gap-1 border border-500 bg-700 px-1"
          style={{ appearance: "auto" }}  
        >
          {data?.enhancingSimulator.map((item: any) => (
            <option key={item.id} value={item.name}>
              {item.name}
            </option>
          ))}
        </select>
      </div>

      <div className="group w-28 flex-none">
        <select
          value={selectedLevel}
          onChange={(e) => setSelectedLevel(e.target.value)}
          className="rounded-md h-10 items-center justify-between gap-2 border border-500 bg-700 px-2"
          style={{ appearance: "auto" }}  
        >
          {levels.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};


export default ItemSelector;
