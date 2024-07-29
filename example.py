import streamlit as st
from st_multimodal_chatinput import multimodal_chatinput

 ##hack to make sure that chatinput is always at the bottom of the page
 ##will only work if multimodal_chatinput is called inside the first st.container of the page

 ##############################################################################
def reconfig_chatinput():
    st.markdown(
        """
    <style>
        div[data-testid="stVerticalBlock"] div[data-testid="stVerticalBlock"]:first-of-type {
            position: fixed;
            bottom: 0;
            width: 100%; /* Span the full width of the viewport */;
            background-color: #0E117;
            z-index: 1000;
            /* Other styles as needed */    
        }
    </style>
    """,
        unsafe_allow_html=True,
    )
    return

reconfig_chatinput()       
##############################################################################

with st.container():
    user_inp = multimodal_chatinput()

if user_inp:
    st.write(user_inp)