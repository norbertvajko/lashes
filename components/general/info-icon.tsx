import { InfoCircledIcon } from "@radix-ui/react-icons"
import { HoverCard, HoverCardContent, HoverCardTrigger } from "@/components/ui/hover-card"

interface InfoIconProps {
    infoText: string;
}
export const InfoIcon = (props: InfoIconProps) => {
    const { infoText } = props;

    return (
        <HoverCard openDelay={70} closeDelay={70}>
            <HoverCardTrigger asChild>
                <InfoCircledIcon className="cursor-pointer" />
            </HoverCardTrigger>
            <HoverCardContent className="mr-7">
               {infoText}
            </HoverCardContent>
        </HoverCard>
    )
}