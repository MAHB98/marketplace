const page = async () => {
 let b: { id: number; name: string; email: string }[] | null = null;
 const a = await fetch("https://jsonplaceholder.typicode.com/users").catch(
  (err) => {
   console.log(err);
   return null;
  }
 );
 if (a) {
  b = await a.json();
 }
 return (
  <div>
   {!!b &&
    b.map((ar, i) => (
     <div key={i}>
      <p>{ar.name}</p>
      <p>{ar.id}</p>
      <p>{ar.email}</p>
     </div>
    ))}
  </div>
 );
};

export default page;
