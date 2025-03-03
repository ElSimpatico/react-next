import { getTechnologies } from "@/actions/technology";

export default async function Home() {
    const technologies = await getTechnologies(1, 10);

    return (
        <div>
            <h1>Listado de tecnologias</h1>
            <ul>
                {(technologies.data ?? []).map((technology) => (
                    <li key={technology.id}>{technology.name}</li>
                ))}
            </ul>
        </div>
    );
}
