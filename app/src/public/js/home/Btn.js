export default class Btn{
    constructor({$target}){
        this.$btnContainer = document.createElement("from"); 
        $target.appendChild(this.$btnContainer)

        this.render()
        this.initEvent()
    }

    initEvent(){x
        const { $btnContainer } = this
        $btnContainer.addEventListener("submit",(event) => {
            const node = event.target.tagName;
            if(node === "BUTTON"){
                //event 삽입
            }
        })
    }

    render(){
        const { $btnContainer } = this
        $btnContainer.innerHTML =`
            <button>이것은 버튼 입니다.</button>
        `
    }
}