import { Button } from "@mantine/core"
import { IconArrowLeft } from '@tabler/icons-react'
import { useNavigate } from "react-router-dom"

export function BackButton() {
    const navigate = useNavigate()
    return (
        <Button p={5} mt={5} variant="subtle" onClick={() => navigate(-1)}>
            <IconArrowLeft height={20}/> Back
        </Button>
    )
}