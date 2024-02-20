import Image from "next/image";

const EmptyFavorites = () => {
    return ( 
        <div className="flex h-full flex-col items-center justify-center">
            <Image 
            width={165} 
            height={165} src="empty-favorites.svg" alt="emptySearch"
            />
            <h2 className="text-2xl font-semibold mt-2">
                No Search found
            </h2>
            <p className="text-sm text-muted-foreground mt-2">
                Try to search something else
            </p>
        </div>
     );
}
 
export default EmptyFavorites;