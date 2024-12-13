interface DetailPageProps {
    params: {
        id: string;
    };
}

export default function Detail({ params }: DetailPageProps) {
    const { id } = params;
    return <div>{`content Detail. ID: ${id ?? ""}`}</div>;
}
