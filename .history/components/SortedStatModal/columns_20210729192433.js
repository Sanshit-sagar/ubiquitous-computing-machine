import { useMemo } from 'react' 
import { useRouter } from 'next/router'
import { DateTime } from 'luxon'
import useSWR from 'swr'

import toast from 'react-hot-toast'
import { Button, Tag, Spinner, Icon } from '@blueprintjs/core'

import Loader from '../Loader'
import SlugProfileDialog from '../SlugProfile'

import { IconButton } from '../../primitives/IconButton'
import { StyledTooltip } from '../../primitives/Tooltip'
import { 
    Dialog, 
    DialogTrigger, 
    DialogContent, 
    DialogClose, 
    DialogTitle, 
    DialogDescription 
} from '../../primitives/Dialog'
import { Flex } from '../../primitives/Flex'

import { ellipses } from '../../lib/utils'
import { timeDifference } from '../../lib/datetime'
import { 
    TriangleUpIcon, 
    TriangleDownIcon, 
    Cross2Icon 
} from '../../primitives/Icons'

// const TriangleUpIcon = () => {
//     return (
//         <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 9H11L7.5 4.5L4 9Z" fill="currentColor"></path></svg>
//     )
// }

// const TriangleDownIcon = () => {
//     return (
//         <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M4 6H11L7.5 10.5L4 6Z" fill="currentColor"></path></svg>
//     )
// }

// const Cross2Icon = () => {
//     return (
//         <svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M11.7816 4.03157C12.0062 3.80702 12.0062 3.44295 11.7816 3.2184C11.5571 2.99385 11.193 2.99385 10.9685 3.2184L7.50005 6.68682L4.03164 3.2184C3.80708 2.99385 3.44301 2.99385 3.21846 3.2184C2.99391 3.44295 2.99391 3.80702 3.21846 4.03157L6.68688 7.49999L3.21846 10.9684C2.99391 11.193 2.99391 11.557 3.21846 11.7816C3.44301 12.0061 3.80708 12.0061 4.03164 11.7816L7.50005 8.31316L10.9685 11.7816C11.193 12.0061 11.5571 12.0061 11.7816 11.7816C12.0062 11.557 12.0062 11.193 11.7816 10.9684L8.31322 7.49999L11.7816 4.03157Z" fill="currentColor" fill-rule="evenodd" clip-rule="evenodd"></path></svg>
//     )
// }

// function ellipses(text, maxlen) {
//     if(text && text.length) {
//         return `${text.substring(0,maxlen)}${text.length>maxlen?'...':''}`; 
//     }
//     return '';
// }

// export const timeAgo = (dateTime) => {
//     const units = [
//         'year',
//         'month',
//         'week',
//         'day',
//         'hour',
//         'minute',
//         'second',
//     ];

//     const diff = dateTime.diffNow().shiftTo(...units);
//     const unit = units.find((unit) => diff.get(unit) !== 0) || 'second';
//     const relativeFormatter = new Intl.RelativeTimeFormat('en', {
//         numeric: 'auto',
//     });

//     return relativeFormatter.format(Math.trunc(diff.as(unit)), unit);
// };

const UserAgentCell = ({ data, title, isLoading }) => {
    return (
        <span className="text-xs font-extralight"> 
            {data} 
        </span>
    ); 
}

export const useViewsBySlug = (email, slug) => {
   
    const { data, error } = useSWR(email && email.length && slug && slug.length ? `/api/stream/slugs/${slug}?email=${email}` : null)

    return {
        views: data ? data.views : undefined,
        viewsLoading: !data && !error,
        viewsError: error
    }
}

export const useSlugDetails = (slug) => {
    const { data, error } = useSWR(slug && slug.length ? `/api/slugs/${slug}` : null);

    return {
        details: data ? data.details : undefined,
        loading: !data && !error,
        error,
    }; 
}


const SlugNameCell = ({ slugName }) => {
    const handleCopy = () => {
        toast((t) => (
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'stretch' }}>
              <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'stretch' }}>
                Copied successfully! Try it out: 
                <button onClick={() => toast.dismiss(t.id)}>
                    Dismiss
                </button>
              </div>

              <input 
                placeholder="Paste it here" 
                style={{ border: 'thin solid black', borderRadius: '5px', marginTop: '10px', padding: '2.5px' }} 
              />
            </div>
        ));   
    }

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

export const SlugViewsCell = ({ slug, email }) => {
    const { views, viewsLoading, viewsError } = useViewsBySlug(email, slug); 

    if(viewsLoading) return <Loader />;
    if(viewsError) return <p> error! </p>;

    return (
        <div className="inline-flex justify-start align-start w-full">
            <div className="flex-col justify-between align-stretch">
                <div className="text-xs font-extralight">  
                    {views.total} total
                </div>
                <div className="text-xs font-extralight">
                    {views.unique} unique
                </div> 
            </div>
            <div className="inline-flex justify-end align-center ml-5">
                {   views.total > 1 || views.unique > 1 ? 
                    <span className="text-green-500 text-md font-md"><TriangleUpIcon /></span> :
                    views.total === 1 && views.unique === 1 ? null :
                    <span className="text-red-500 text-md font-md"><TriangleDownIcon /></span>
                }
            </div>
        </div>
    ); 
}

function getIntent(progressValue) {
    if(progressValue >= 80) return "success";
    else if(progressValue >= 60) return "none";
    else if(progressValue >= 40) return "warning";
    return "danger";
}

const getColumns = (key, email, cellsLoading) => {
    const router = useRouter()

    if(!key || !key.length) {
        return null; 
    }
   
    const allViewsColumns = useMemo(() => [
        {
            Header: <Button 
                        rightIcon="link" 
                        text={
                            <span className="text-xs font-extralight"> 
                                Slug
                            </span>
                        } 
                        minimal={true} 
                        fill={true} 
                        alignText="left" 
                    />,
            accessor: `links`,
            Cell: ({ value }) => {
                return (
                     <SlugNameCell slugName={value.slug} />
                );
            },
        },
        {
            Header: <Button 
                        rightIcon="link" 
                        text={
                            <span className="text-xs font-extralight"> 
                                Destination
                            </span>
                        }  
                        minimal={true} 
                        fill={true}  
                        alignText="left"
                    />,
            accessor: `destination`,
            Cell: ({ value }) => {
                return (
                    <div style={{ width: '170px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                        <Button 
                            rightIcon={<Icon icon="link" intent="primary" />}
                            text={
                                <span className="text-xs font-extralight"> 
                                    {ellipses(value.hostname.substring(0,15), 35)}...
                                </span>
                            }
                            minimal={true} 
                            fill={true} 
                            alignText="left"
                            onClick={() => router.push(`${value.url}`)} 
                        />                            
                    </div>
                );
            }
        },
        {
            Header: <Button 
                        rightIcon="geolocation" 
                        text={
                            <span className="text-xs font-extralight"> 
                                Location
                            </span>
                        }  
                        minimal={true} 
                        fill={true} 
                        alignText="left" 
                    />,
            accessor: `geodata`,
            Cell: ({ value }) => {
                return (
                    <div style={{ width: '155px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <Button 
                            rightIcon="locate"
                            text={
                                <span style={{ display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>
                                    <span className="text-xs font-extralight"> 
                                        {value.location} 
                                    </span>
                                    <span className="text-xs font-extralight"> 
                                        {value.coordinates.split('.')[0]}.{value.coordinates.split('.')[1].split(' ')[0].substring(0,2)}, {value.coordinates.split('.')[1].split(' ')[1]}.{value.coordinates.split('.')[2].substring(0,2)}
                                    </span>
                                </span>
                            }
                            minimal={true} 
                            large={false}
                            fill={true} 
                            small={true}
                            alignText="left"
                            onClick={() => console.log('showing location')}
                        />
                    </div>
                 );
            }
        },
        {
            Header: <Button rightIcon="ip-address" text={
                <span className="text-xs font-extralight"> 
                    IP Address
                </span>
            }  minimal={true} alignText="left" fill={true} />,
            accessor: `ipInfo`,
            Cell: ({ value }) => {
                return (
                    <span style={{ width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>    
                        <span className="text-xs font-extralight ">
                            {value.ip} 
                        </span>
                    </span>
                );
            }
        },
        {
            Header: <Button text='' rightIcon="globe" minimal={true} alignText="left" />,
            accessor: `browser`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Browser" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <Button text='' rightIcon="desktop" minimal={true} alignText="left" />,
            accessor: `os`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Operating System" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <Button text='' rightIcon="pulse" minimal={true} alignText="left" />,
            accessor: `engine`,
            Cell: ({ value }) => {
                return <UserAgentCell data={value} title="Engine" isLoading={cellsLoading} />; 
            }
        },
        {
            Header: <Button text={
                <span className="text-xs font-extralight"> 
                    Timestamp
                </span>
            } rightIcon="calendar" minimal={true} alignText="left" />,
            accessor: `timestamp`,
            Cell: ({ value }) => {
                let timestampVal = parseInt(value)
                let localeTimeStr = DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT)

                return (
                    <Button 
                        text={
                                <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>            
                                    <span className="text-xs font-extralight"> 
                                        {localeTimeStr.substring(0,4)}, {localeTimeStr.substring(10)}
                                    </span>
                                    <span className="text-xs font-extralight"> 
                                        {`${timeDifference(DateTime.fromMillis(timestampVal))}`}
                                    </span>
                                </div>
                            } 
                        alignText="left" 
                        fill={true} 
                        minimal={true} 
                    /> 
                );
            }
        },
        {
            Header: <Button 
            text={
                <span className="text-xs font-extralight"> 
                    Views
                </span>
            }
            rightIcon="calculator" minimal={true} alignText="left" />,
            accessor: `slug`,
            Cell: ({ value }) => {
                return (
                    <SlugViewsCell slug={value} email={email} /> 
                )
            }
        }
    ], []);

    const mostViewedPagesColumns = useMemo(() => [
        {
            Header: 'Slug',
            accessor: `slug`,
        },
        {
            Header: 'Views',
            accessor: `views`,
            width: 75,
        },
    ], []);
    
    const uniqueVisitorsColumns = useMemo(() => [
        {
            Header: 'IP Address',
            accessor: `ip`,
        },
        {
            Header: 'Views',
            accessor: `views`,
        },
    ], []); 

    const allLinksColumns = useMemo(() => [
        {
            Header: <Button rightIcon="id-number" text='Slug' minimal={true} fill={true}  alignText="left"/>,
            accessor: `slug`,
            Cell: ({ value }) => {
                return (
                    <SlugNameCell slugName={value} /> 
                );
            }
        },
        {
            Header: <Button rightIcon="link" text='Destination' minimal={true} fill={true}  alignText="left"/>,
            accessor: `destination`,
            Cell: ({ value }) => {
                return (
                    <span style={{ width: '175px', display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                       
                            <Button 
                                rightIcon="document-open" 
                                minimal={true} 
                                text={`${value.substring(0,20)}...`}
                                intent="primary"
                                alignText="left"
                                fill={true}
                                onClick={() => router.push(`${destination}`)}
                            // onClick={() => router.push(`https://writer.hashably.workers.dev/${slugName}`)} 
                        />
                    </span>
                );
            }
        },
        {
            Header: <Button text='Created At' rightIcon="calendar" minimal={true} alignText="left" fill={true} />,
            accessor: `datetime`,
            Cell: ({ value }) => {
                let dateObj = new Date(value); 
                let timestampVal = parseInt(dateObj.getTime().toString())

                return (
                    <Button 
                        text={
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>            
                                <span className="text-xs font-extralight"> 
                                    {DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT)} 
                                </span>
                                <span className="text-xs font-extralight"> 
                                    {`${timeDifference(DateTime.fromMillis(timestampVal))}`}
                                </span>
                            </div>
                        } 
                        alignText="left" 
                        fill={true} 
                        minimal={true} 
                    /> 
                );
            }
        },
        {
            Header: <Button text='Expiry' rightIcon="outdated" minimal={true} alignText="left" fill={true} />,
            accessor: `ttl`,
            Cell: ({ value }) => {
                if(!value || !value.length) return null;

                let dateObj = new Date(value); 
                let timestampVal = parseInt(dateObj.getTime().toString()) 
                let doesExpire = timestampVal && timestampVal > 0

                return (
                    <Button 
                        text={
                            <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'flex-start', alignItems: 'flex-start' }}>            
                                <span className="text-xs font-extralight"> 
                                    {doesExpire ? DateTime.fromMillis(timestampVal).toLocaleString(DateTime.DATETIME_SHORT) : null} 
                                </span>
                                <span className="text-xs font-extralight"> 
                                    {doesExpire ? `${timeDifference(DateTime.fromMillis(timestampVal))}` : null}
                                </span>
                            </div>
                        } 
                        alignText="left" 
                        fill={true} 
                        minimal={true} 
                    /> 
                );
            }
        },
        {
            Header: <Button text='Health' rightIcon="lifesaver" minimal={true} alignText="left" fill={true} />,
            accessor: `expiry`,
            Cell: ({ value }) => {
                if(!value || value===NaN) return <Tag minimal round intent="success"> Active </Tag>;

                let now = new Date().getTime();
                const isActive = !value || !value.length || parseInt(value)>now
                let doesExpire = value==='NaN' || !value

                return (
                    <Tag 
                        interactive={false}
                        large={false}
                        minimal={true}
                        round={true}

                        intent={isActive || doesExpire ? "success" : "danger"}
                    >
                        <span className="text-xs font-extralight">
                            {value==='NaN' ? 'Immortal' : `${isActive ? 'Active' : 'Expired'}`}
                        </span>
                    </Tag>
                );
            }
        },
        {
            Header: <Button text='TTL' rightIcon="time" minimal={true} alignText="left" fill={true} />,
            accessor: `lifeleftPct`,
            Cell: ({ value }) => {
                // return <p> {value} </p>;
                if(value==='NaN') {
                    value = 100;
                }

                let progress = value/100;

                return (
                    <>{ value===0 ? null :
                    <span className="inline-flex justify-between align-stretch">
                        <span>
                            <Spinner
                                size="20"
                                value={progress}
                                intent={getIntent(value)}
                            />
                        </span>
                        <span className="inline-flex justify-between align-stretch ml-3">
                            {value}%
                        </span>
                    </span>
                 }</>
                );
            }
        },
        {
            Header: <Button text='' rightIcon="app-header" minimal={true} alignText="left" fill={true} />,
            accessor: `routingStatus`,
            Cell: ({ value }) => {
                return (
                    <Tag intent="primary">
                        {`HTTP ${value}`}
                    </Tag>
                );      
            }
        },
        {
            Header: <Button rightIcon="shield" text='' minimal={true} fill={true} alignText="left"/>,
            accessor: `password`,
            Cell: ({ value }) => {
                const isSecure = value && value.length
                return (
                    <StyledTooltip
                        content={
                            <span className="inline-flex justify-between align-stretch w-full">
                                <span className="text-xs font-extralight">
                                    {isSecure ? `Password: ${JSON.stringify(value)}` : 'Not secured. '}
                                </span>
                                {!isSecure ? <a href="#"> Add Password? </a> : null}
                            </span>
                        }
                    >
                        <Button 
                            minimal={true} 
                            icon={isSecure ? 'lock' : 'unlock'} 
                            intent={isSecure ? 'success' : 'warning'} 
                        />
                    </StyledTooltip>
                );
            }
        },
        {
             Header: <Button rightIcon="calculator" text='Views' minimal={true} fill={true}  alignText="left"/>,
             accessor: 'views',
             Cell: ({ value }) => {
                return (
                    <SlugViewsCell slug={value} email={email} /> 
                );
             }    
        }
    ], []); 

    if(key==='mostViewedPages') {
        return mostViewedPagesColumns;
    } else if(key==='allViews') {
        return allViewsColumns; 
    } else if(key==='uniqueVisitors') {
        return uniqueVisitorsColumns;
    } else if(key==='allLinks') {
        return allLinksColumns;
    }

    return null; 
}

export default getColumns 