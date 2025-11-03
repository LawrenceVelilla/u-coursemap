 export function createRange<T = number>(
       length: number,
       initializer?: (index: number) => T
     ): T[] {
       return Array.from({ length }, (_, index) =>
         initializer ? initializer(index) : (index as T)
       );
     }