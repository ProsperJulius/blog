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