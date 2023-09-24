import { Web3Storage } from 'web3.storage'

function getAccessToken() {
    return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDhFY2UxMDhhMDRmN2FlQjBDYTMyMjZkN0UwNkMwQzNEQkQ4QmVCRGEiLCJpc3MiOiJ3ZWIzLXN0b3JhZ2UiLCJpYXQiOjE2ODQ3OTQ5NDYzMzMsIm5hbWUiOiJWb2ljZWZsb3cifQ.5uFjHkx7hxIauPjfdFEidTgFSAn1RwypQWjUZ2-o4WM'
}

function makeStorageClient() {
    return new Web3Storage({ token: getAccessToken() })
}

function getFiles() {
    const fileInput = document.querySelector('input[type="file"]')
    return fileInput.files
}

function makeFileObjects() {
    // You can create File objects from a Blob of binary data
    // see: https://developer.mozilla.org/en-US/docs/Web/API/Blob
    // Here we're just storing a JSON object, but you can store images,
    // audio, or whatever you want!
    const obj = { hello: 'world' }
    const blob = new Blob([JSON.stringify(obj)], { type: 'application/json' })

    const files = [
        new File(['contents-of-file-1'], 'plain-utf8.txt'),
        new File([blob], 'hello.json')
    ]
    return files
}

async function storeFiles(files) {
    const client = makeStorageClient()
    const cid = await client.put(files)
    console.log('stored files with cid:', cid)
    return cid
}

async function storeWithProgress(files) {
    // show the root cid as soon as it's ready
    const onRootCidReady = cid => {
        console.log('uploading files with cid:', cid)
    }

    // when each chunk is stored, update the percentage complete and display
    const totalSize = files.map(f => f.size).reduce((a, b) => a + b, 0)
    let uploaded = 0

    const onStoredChunk = size => {
        uploaded += size
        const pct = 100 * (uploaded / totalSize)
        console.log(`Uploading... ${pct.toFixed(2)}% complete`)
    }

    // makeStorageClient returns an authorized web3.storage client instance
    const client = makeStorageClient()

    // client.put will invoke our callbacks during the upload
    // and return the root cid when the upload completes
    return client.put(files, { onRootCidReady, onStoredChunk })
}