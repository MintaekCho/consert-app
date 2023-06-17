export default {
    title: 'User',
    name: 'user',
    type: 'documents',
    fields: [
        {
            title: 'Email',
            name: 'email',
            type: 'string'
        },
        {
            title: 'DisplayName',
            name: 'displayName',
            type: 'string'
        },
        {
            title: 'Bookmark',
            name: 'bookmark',
            type: 'array',
            of: [
                {
                    title: 'Consert',
                    name: 'consert',
                    type: 'documents',
                    fields: [
                        {
                            title: 'ArtistName',
                            name: 'artistName',
                            type: 'string'
                        }
                    ]
                }
            ]
        }
    ]
}