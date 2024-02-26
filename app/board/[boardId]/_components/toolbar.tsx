const Toolbar = () => {
    return ( 
    <div className="absolute top-[50%] left-2 -translate-y-[50%] flex flex-col gap-y-4">
        <div className="bg-white rounded-md p-1.5 gap-y-1 flex flex-col items-center shadow-md">
            <div>
                pencil
            </div>
            <div>
                square
            </div>
            <div>
                circle
            </div>
            <div>
                rectangle
            </div>
        </div>
        <div className="flex flex-col items-center bg-white rounded-md shadow-md p-1.5">
            <div>
                undu
            </div>
            <div>
                redu
            </div>
        </div>
    </div> );
}
 
export default Toolbar;