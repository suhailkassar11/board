import {create} from "zustand"

const defaultValues={id:"",title:""}
interface IRenamedModal{
    isOpen:boolean,
    initialValue:typeof defaultValues;
    onOpen:(id:string, title:string)=>void;
    onClose:()=>void;
};

export const useRenameModal=create<IRenamedModal>((set)=>({
    isOpen:false,
    onOpen:(id,title)=>set({
        isOpen:true,
        initialValue: {id, title},
    }),
    onClose:()=>set({
        isOpen:false,
        initialValue:defaultValues,
    }),
    initialValue:defaultValues
}))