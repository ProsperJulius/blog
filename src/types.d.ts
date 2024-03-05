export interface Todo {
   id?: string;
   content: string;
   isCompleted?: boolean;

}


export interface Stroke {

   color: string;
   points: Point[]
}

export interface Point {
   x: number;
   y: number;
}


export interface Country{
   name:string;
   capital:string;
   iso2:string;
   iso3
}