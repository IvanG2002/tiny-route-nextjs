"use client"
import { Input } from "@/components/ui/input"
import { Button } from "./ui/button"
import { useEffect, useState } from "react"
import Loading from "./loading"
import { motion } from "framer-motion"
import { useCopyToClipboard } from "@/hooks/useClipBoard"
import { toast } from "sonner"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Label } from "@radix-ui/react-dropdown-menu"
import { Link } from "@/interfaces/Link"
import { Box, Copy, Plus, SearchIcon, Tag, Trash } from "lucide-react"
import { GearIcon } from "@radix-ui/react-icons"

function Links() {
  const [isLoading, setIsLoading] = useState(true)
  const [search, setSearch] = useState("");
  const [, copy] = useCopyToClipboard()
  const [links, setLinks] = useState<Array<Link>>([])
  const [filteredLinks, setFilteredLinks] = useState(links)
  const [isLink, setIsLink] = useState(true)
  const [link, setLink] = useState("")

  useEffect(() => {
    // fetch de datos
    // fetch("https://tiny-route-app.vercel.app/api/users")
    //   .then((resp) => resp.json())
    //   .then((data) => console.log(data.nombre));

    if (typeof window !== "undefined") {
      const storedLinks = localStorage.getItem('links');
      // Verificar si hay datos almacenados
      if (storedLinks) {
        // Convertir la cadena JSON a un objeto JavaScript
        const links = JSON.parse(storedLinks);
        setLinks(links)
      } else {
        console.log('No links found in localStorage.');
      }
      //TODO: pedir a la base de datos, en caso de no estar en el local storage
    }

  }, [])
  useEffect(() => {
    setTimeout(() => {
      setIsLoading(false)
    }, 100);
  }, [])

  useEffect(() => {
    setFilteredLinks(
      links.filter(link => {
        return search.toLocaleLowerCase() === "" ||
          link.shortUrl.toLocaleLowerCase().includes(search.toLocaleLowerCase());
      })
    );
  }, [search, links]);


  useEffect(() => {
    const expression = /^(https?:\/\/)?([a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)+)(:\d+)?(\/[-a-zA-Z0-9()@:%_+.~#?&//=]*)?$/gi;
    const regex = new RegExp(expression);
    if (link.match(regex)) {
      setIsLink(true); // Es un enlace válido
    } else {
      setIsLink(false); // No es un enlace válido
    }
  }, [link]);

  const handleCopy = async (text: string) => {
    try {
      const copied = await copy(text);
      if (copied) {
        toast.success("Link copied to clipboard", {
          description: `${text}`,
        });
      }
    } catch (e) {
      const errorMessage = e instanceof Error ? e.message : String(e);
      toast.error("An unexpected error has occurred. Please try again later.", {
        description: errorMessage,
      });
    }
  };

  const handleDeleted = (id: number) => {

    if (typeof window !== "undefined") {
      const storedLinks = localStorage.getItem('links');

      // Verificar si hay datos almacenados
      if (storedLinks) {
        // Convertir la cadena JSON a un objeto JavaScript
        const links = JSON.parse(storedLinks);
        const updatedLinks = links.filter((link: { id: string | number }) => link.id !== id);

        // Actualizar el estado con los enlaces filtrados
        setLinks(updatedLinks);

        // Guardar los enlaces actualizados en localStorage
        localStorage.setItem('links', JSON.stringify(updatedLinks));
      } else {
        console.log('No links found in localStorage.');
      }
    }
  }

  const handleLink = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { elements } = e.currentTarget;
    const url = (elements.namedItem("url") as HTMLInputElement).value;
    const shortUrl = (elements.namedItem("shortUrl") as HTMLInputElement).value;

    const userId = 1; // Puedes obtener el userId dinámicamente si lo tienes disponible

    try {
      // Hacer la petición a la API
      const response = await fetch('https://tiny-route-app.vercel.app/api/shorten', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          original_url: url,
          short_code: shortUrl,
          userId,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        // Actualizar el estado de los links con la respuesta de la API
        setLinks([
          ...links,
          {
            id: data.id || Math.floor(Math.random() * 10000), // Utiliza el id de la base de datos si está disponible
            shortUrl: data.short_url, // Usar la URL acortada que devuelve la API
            url: url,
            date: new Date().toLocaleDateString(),
          },
        ]);

        // Guardar los datos en localStorage
        if (typeof window !== "undefined") {
          localStorage.setItem('links', JSON.stringify([...links, {
            id: data.id || Math.floor(Math.random() * 10000),
            shortUrl: data.short_url,
            url: url,
            date: new Date().toLocaleDateString(),
          }]));
        }
      } else {
        console.error("Error al acortar la URL:", data.error);
      }
    } catch (error) {
      console.error("Error del servidor:", error);
    }
  };

  return (
    <>
      <header className="flex items-center lg:justify-between w-full bg-white h-10">
        <div className="relative rounded-md bg-gray-100 dark:bg-gray-800 w-32 lg:w-48 mr-2">
          <Input type="text" placeholder="Search" name="search" onChange={e => setSearch(e.target.value)} className="rounded-md outline-none appearance-none  w-32 lg:w-48 pl-8 text-xs" />
          <SearchIcon className="absolute left-2.5 top-2.5 w-4 h-4 text-gray-400 dark:text-gray-600" />
        </div>
        <div className="flex gap-3 font-mono">
          <Button variant={"outline"}><Box className="lg:h-4 lg:w-4 lg:mr-2"></Box><span>{links.length < 10 ? `0${filteredLinks.length}` : filteredLinks.length}/10</span></Button>
          <Button variant={"outline"}><Tag className="lg:h-4 lg:w-4 lg:mr-2"></Tag><span className="lg:block hidden">Select tag</span></Button>
          <Dialog>
            <DialogTrigger><Button variant={"secondary"}><Plus className="lg:h-4 lg:w-4 lg:mr-2"></Plus><span className="lg:block hidden">Create Link</span></Button></DialogTrigger>
            <DialogContent className="sm:max-w-[425px] bg-white border-none">
              <DialogHeader>
                <DialogTitle>Create Link</DialogTitle>
                <DialogDescription>
                  Optimize and manage the slug of your links
                </DialogDescription>
              </DialogHeader>
              <form onSubmit={handleLink}>
                <div className="grid gap-4 py-4">
                  <div className="flex flex-col gap-2 items-start">
                    <Label className="text-right">
                      Destination URL
                    </Label>
                    <Input
                      onChange={(e) => setLink(e.target.value)}
                      id="url"
                      defaultValue="https://"
                      className="col-span-3"
                    />
                    {!isLink && <p className="text-red-600 text-sm">is not a web site URL</p>}
                  </div>
                  <div className="flex flex-col gap-2 items-start">
                    <Label className="text-right">
                      Short Link
                    </Label>
                    <Input
                      id="shortUrl"
                      defaultValue="My New Link"
                      className="col-span-3"
                    />
                  </div>
                </div>
                <DialogFooter>
                  <Button type="submit"> 🛠️ Create</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>
      </header>
      <section className="flex pt-5 gap-3 flex-wrap w-full">
        {isLoading ? <Loading /> : filteredLinks
          .map(link => (
            <motion.div initial={{ y: "30px" }} animate={{ y: 0 }} transition={{ ease: "linear", duration: 0.2 }} key={link.id} className="flex flex-col rounded-md border w-full lg:w-[30rem] border-neutral-200 p-3 shadow-sm dark:border-neutral-800 bg-white">
              <header className="flex">
                <div className="flex flex-col">
                  <h1 className="font-semibold font-mono text-[#1a1a1a] text-ellipsis text-wrap text-[11px]">🔗{link.shortUrl}</h1>
                  <h5 className="text-xs font-mono text-[#9f9f9f] text-[11px]">{link.url}</h5>
                  <h6 className="text-[10px] font-mono text-[#9f9f9f]">{link.date}</h6>
                </div>
                <div className="flex gap-3 ml-auto relative items-center justify-center">
                  <div className="h-3 w-[1px] bg-[#cecece] mr-2 absolute -left-4"></div>
                  <Button onClick={() => handleCopy(`${link.shortUrl}`)} variant={"secondary"}><Copy className="h-3 w-3"></Copy></Button>
                  <Button variant={"secondary"}><GearIcon className="h-3 w-3"></GearIcon></Button>
                  <Button onClick={() => handleDeleted(link.id)} variant={"secondary"}><Trash className="h-3 w-3"></Trash></Button>
                </div>
              </header>
            </motion.div>
          ))}
      </section>
    </>
  )
}

export default Links