interface DetailPageProps {
    params: Promise<{
        id: string;
    }>;
}

export default async function Detail({ params }: DetailPageProps) {
    const { id } = await params;
    return <div>{`content Detail. ID: ${id ?? ""}`}</div>;
}
