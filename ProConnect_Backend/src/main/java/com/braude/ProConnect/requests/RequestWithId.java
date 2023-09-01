package com.braude.ProConnect.requests;

public class RequestWithId<T> {
    private long id;
    private T data;

    public RequestWithId() { }

    public RequestWithId(long id, T data) {
        this.id = id;
        this.data = data;
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public T getData() {
        return data;
    }

    public void setData(T data) {
        this.data = data;
    }
}
