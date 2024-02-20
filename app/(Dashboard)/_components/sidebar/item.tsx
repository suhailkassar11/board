import { useOrganization, useOrganizationList } from "@clerk/nextjs";
import { cn } from "@/lib/utils";
import Image from "next/image";
import { Hint } from "@/components/hint";

interface ItemProps {
  id: string;
  name: string;
  imageUrl: string;
}
const Item = ({ id, name, imageUrl }: ItemProps) => {
  const { setActive } = useOrganizationList();
  const { organization } = useOrganization();
  const isActive = organization?.id === id;
  const onClick = () => {
    if (!setActive) return;
    setActive({ organization: id });
  };

  return (
    <div className="aspect-square w-11 h-11 relative">
      <Hint side="right" label={name} align="end">
        <Image
        fill
          alt={name}
          src={imageUrl}
          onClick={onClick}
          className={cn(
            "rounded-md cursor-pointer opacity-75 hover:opacity-100 transition",
            isActive && "opacity-100"
          )}
        />
      </Hint>
    </div>
  );
};

export default Item;
