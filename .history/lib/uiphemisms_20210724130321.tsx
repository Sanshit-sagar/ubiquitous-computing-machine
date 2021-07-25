
function isPageActive(activePageName, currentPageIndex, sidebarNavigation) {
    if(!activePageName || !currentPageIndex || sidebarNavigation.length < currentPageIndex) return false; 
    return sidebarNavigation[currentPageIndex].name === activePageName;
}