import { cn } from "@/lib/utils";



interface ContainerProps{
    children:React.ReactNode;
    className?:string;
}

export default function Container({children,className}:ContainerProps) {

//contain say tke space of div according to screen ,className - the css came from suing of the component 

  return (
    <div className={cn("container mx-auto px-4", className)}>
      {children}
    </div>
  )
}
