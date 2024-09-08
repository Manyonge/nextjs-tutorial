import { db } from "~/server/db";

export const dynamic = "force-dynamic";

const mockUrls = [
  'https://utfs.io/f/1cab64cd-da90-49d5-8842-9433ac33b56f-v5vqm4.jpeg',
  'https://utfs.io/f/12c204ff-eeed-4d1d-9e17-0cd3b251650b-v5vqop.jpeg',
  'https://utfs.io/f/cdbee9cc-2db3-4a0a-9acc-5ac2b0aab542-v5vqmz.jpeg',
  'https://utfs.io/f/cdbee9cc-2db3-4a0a-9acc-5ac2b0aab542-v5vqmz.jpeg',
]

const mockImages = mockUrls.map((url, index)=>({
  id: index + 1,
  url
}))

export default async function HomePage() { 
  const images = await db.query.images.findMany({
    orderBy: (model, {desc})=>desc(model.id),
  }) 
  
  return (
    <main className="">
      <div className='flex flex-wrap gap-4'>
        {images.map((image) => (
          <div key={image.id} className='w-48'>
            {image.name}
          </div>
        ))}
        {[...mockImages, ...mockImages, ...mockImages].map((image, index)=>(
          <div key={image.id +"_"+ index } className='w-48'>
            <img src={image.url} alt={`Image ${image.id}`}/>
          </div>
        ))}
      </div>

    </main>
  );
}
