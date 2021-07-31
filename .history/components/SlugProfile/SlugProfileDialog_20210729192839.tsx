
const SlugDetailsDialog = () => {
    return (
        <Dialog>
            <DialogContent>
                <Flex css={{ display: 'flex',flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <DialogTitle>
                        {slugName}
                    </DialogTitle>

                    <DialogClose as={IconButton}>
                        <Cross2Icon />
                    </DialogClose>
                </Flex>

                <DialogDescription>
                    <SlugProfileDialog slug={slugName} />
                </DialogDescription>

                <Flex css={{ marginTop: 25, justifyContent: 'flex-end' }}>
                    <DialogClose as={Button} aria-label="Close" variant="green">
                        Save changes
                    </DialogClose>
                </Flex>
            </DialogContent>
        
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', width: '275px' }}>
                <DialogTrigger>
                    <Button icon="maximize" intent="success" />
                </DialogTrigger>

                <span className="text-xs font-extralight flex flex-wrap">
                    {ellipses(slugName, 25)} 
                </span>
                <span style={{ display: 'flex', flexDirection:'row', justifyContent: 'flex-end', alignItems: 'flex-end' }}>
                    <Button 
                        icon="clipboard" 
                        minimal={true} 
                        intent="none" 
                        onClick={handleCopy}
                    />
                </span>
            </div>
        </Dialog>
    )
}