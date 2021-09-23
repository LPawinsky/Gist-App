import Wrapper from '../Wrapper';
jest.mock('../Wrapper')
describe("github wrapper communication tests", () => {
    const wrapper = new Wrapper();
    jest.spyOn(wrapper, 'getRequest');
    const fakeAxios = {
        get: jest.fn(() => { Promise.resolve({ data: "Some data" })}),
        path: jest.fn(() => { Promise.resolve({ path: '/'})})
    };
    beforeEach(() => {
        Object.defineProperty(window, "localStorage", {
            value: {
                getItem: jest.fn(() => null),
                setItem: jest.fn(() => 'some token')
            },
            writable: true
        });
    });
    it("should get localStorage token", () => {
        const wrapper = new Wrapper();
        expect(localStorage.getItem).toBeCalled();
        expect(localStorage.getItem).toBeCalledWith('token');
    })
    it("get request is ready to go", () => {
        console.log(window.localStorage)
        expect(wrapper.getRequest('/')).toBeCalled()
    })
})

// { Wrapper, getRequest, postRequest, deleteRequest, root, createGist, editGist, deleteGist, getGist, getIds}