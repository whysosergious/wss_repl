
/*************************************************************
*! __________________________________________________________
*? ---------------------------------------------------------- 
*. ⚙ lets define some building blocks & structure guidelines

*!  ********************************************************
*?   this is an example structure of 
*?   the help docs tht will define & describe

*.   - ## EVENTS 
*.   - ## BUILDER OBJECT
*.   - ## OPERATIONAL VECTORS
*.   - ## OPVEC RECIPIES

**    will be auto generated with a schema & detailed by llm's 
*?  --------------------------------------------------


*!  ______________________
*?  ----------------------
*.   - ####  ROOT  #### -
*?   --------------------

*'   ## - PORTABLE EVERYTHING
      #iid: pocket_main
      #name: pocket
      #sum: where Polly lives 
      #role: portaböe root
      #desc: a 'status' bar, can be expanded with everything
        that will be implemented. owns own workspace, can inherit top-layer
        functionality if/when needed.
        
*? Polly lives here 
        *' ᓚᘏᗢ    ♥ ♥ ♥ <3
   *? only one that can't be hidden


*!  _________________________
*?  -------------------------
*.   - ####  HELPERS  #### -
*?   -----------------------

*'   ## - THE DEFINIITION BLOCK
      #iid: #h/def
      #name: def 
      #sum: The definiton block
      #role: multi-purpouse
      #desc: defines/creates a wrapping/containment block.
        all new blocks get aN instance id in form of an 8char hash.
        also inherit name/desc from the def-block variant.
        variants specify different behaivour.
        make static composable block? if so, required props can be only specified 
        on first defintion and only be extended by optional properties.

*'   ## - HITBOX
      #iid: #h/hitbox
      #name: hitbox
      #sum: logic through interaction
      #role: effect dispatcher
      #desc: should only be visible during debugging/implementation


sidenote: the hashes define doc content, 4x - groups/files.
*! ********************************************
*? *******************************************/


 import default_editor from '../editor/CodeMirrorEditor.vue'
import PocketRoot from './cmp_vue/PocketRoot.vue'


export const the_myth = {
      setup( ) {}
      
}

import { h } from 'vue'


const renderComponent = function({ el, component, props, appContext }: any) {
      let vnode = createVNode(component, props)
      vnode.appContext = { ...appContext }
      render(vnode, el)
 
      return () => {
          //!! destroy
          render(null, el)
          vnode = undefined as any
      }
  }

  let component: any = null
  export const insertComponent = async () => {
      const component_element = document.createElement('div')
      document.body.appendChild(component_element)

      component?.()
      component = renderComponent({
          el: component_element,
          component: (await import('@shared/components/AbstractBlock/AbstractBlock.vue')).default,
          props: {
              // block
          },
          // appContext: au_state.appContext
      })
  }
  
//   window.f = () => {

//       'ffs'

//       @src/
//   }
//   from 11'vue'
// import { pocket } from ''

// const App = {
      // // setup() {
      // //   return () =>
      //     h(PocketRoot, {
      //       // store,
      //       theme: 'dark',
      //       editor: default_editor,
      //       // layout: 'vertical',
      //       // ssr: true,
      //       // sfcOptions: {
      //       //   script: {
      //           // inlineTemplate: false
      //       //   },
      //       },
      //       // showCompileOutput: false,
      //       // showImportMap: false
      // //     }
      //     )
      // // }
// }
